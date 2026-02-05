import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin, STORAGE_BUCKET, getStoragePath, getPublicUrl } from "@/lib/supabase";

// POST - Crear producto
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Procesar imágenes: puede ser string separado por comas o array
    let imageUrls: string[] = [];
    if (typeof body.images === 'string') {
      imageUrls = body.images
        .split(',')
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0);
    } else if (Array.isArray(body.images)) {
      imageUrls = body.images.filter((url: string) => url.length > 0);
    }

    if (imageUrls.length === 0) {
      return NextResponse.json(
        { error: "Se requiere al menos una imagen" },
        { status: 400 }
      );
    }

    // Crear producto SIN imágenes primero
    const product = await (prisma.product as any).create({
      data: {
        title: body.title,
        description: body.description,
        statusId: body.statusId,
        entregado: body.entregado === true,
        pagado: body.pagado === true,
        condition: body.condition,
        measurements: body.measurements,
        price: parseInt(body.price),
      },
      include: {
        status: true,
      },
    });

    const productId = product.id;
    const finalImageUrls: string[] = [];

    // Mover imágenes temporales a carpeta del producto
    for (let i = 0; i < imageUrls.length; i++) {
      const tempUrl = imageUrls[i];
      
      // Detectar si es una URL temporal
      if (tempUrl.includes('/temp-')) {
        try {
          // Extraer ruta del storage de la URL
          const urlParts = tempUrl.split('/storage/v1/object/public/product-images/')[1];
          const [tempFolder, fileName] = urlParts.split('/');
          
          // Ruta temporal y nueva ruta
          const tempPath = `${tempFolder}/${fileName}`;
          const imageId = fileName.split('.')[0];
          const ext = fileName.split('.').pop();
          const newPath = getStoragePath(productId, imageId, ext || 'jpg');

          // Descargar archivo temporal
          const { data: fileData, error: downloadError } = await supabaseAdmin.storage
            .from(STORAGE_BUCKET)
            .download(tempPath);

          if (downloadError) {
            console.error('Error downloading temp file:', downloadError);
            finalImageUrls.push(tempUrl); // Usar URL temp si falla
            continue;
          }

          // Subir a nueva ubicación
          const { error: uploadError } = await supabaseAdmin.storage
            .from(STORAGE_BUCKET)
            .upload(newPath, fileData, {
              contentType: fileData.type,
              upsert: false,
            });

          if (uploadError) {
            console.error('Error uploading to final location:', uploadError);
            finalImageUrls.push(tempUrl); // Usar URL temp si falla
            continue;
          }

          // Eliminar archivo temporal
          await supabaseAdmin.storage
            .from(STORAGE_BUCKET)
            .remove([tempPath]);

          // Generar URL final
          const finalUrl = getPublicUrl(newPath);
          finalImageUrls.push(finalUrl);
        } catch (error) {
          console.error('Error moving temp image:', error);
          finalImageUrls.push(tempUrl); // Usar URL temp si falla
        }
      } else {
        // No es temporal, usar tal cual
        finalImageUrls.push(tempUrl);
      }
    }

    // Crear registros de ProductImage con URLs finales
    await (prisma.productImage as any).createMany({
      data: finalImageUrls.map((imageUrl, index) => ({
        productId,
        imageUrl,
        isMain: index === 0,
        displayOrder: index,
      })),
    });

    // Obtener producto completo con imágenes
    const finalProduct = await (prisma.product as any).findUnique({
      where: { id: productId },
      include: {
        status: true,
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });

    return NextResponse.json(finalProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}

// GET - Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        status: true,
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
    return NextResponse.json(products);
  } catch {
    // Error silenciado
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}
