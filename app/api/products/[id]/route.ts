import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin, STORAGE_BUCKET, getStoragePath, getPublicUrl } from "@/lib/supabase";

// GET - Obtener un producto por ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        status: true,
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },
        attributes: {
          include: {
            attribute: true,
            option: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch {
    // Error silenciado
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un producto
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Si hay nuevas imágenes, procesarlas
    if (body.images) {
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

      // Obtener imágenes actuales
      const currentImages = await prisma.productImage.findMany({
        where: { productId: id }
      });

      // Eliminar imágenes que no están en la nueva lista
      const urlsToDelete = currentImages
        .filter(img => !imageUrls.includes(img.imageUrl))
        .map(img => img.id);

      if (urlsToDelete.length > 0) {
        await prisma.productImage.deleteMany({
          where: { id: { in: urlsToDelete } }
        });
      }

      // Agregar nuevas imágenes
      const existingUrls = currentImages.map(img => img.imageUrl);
      const newUrls = imageUrls.filter(url => !existingUrls.includes(url));

      if (newUrls.length > 0) {
        const maxOrder = Math.max(
          0,
          ...currentImages.map(img => img.displayOrder || 0)
        );

        // Procesar URLs temporales y mover a estructura final
        const finalImageUrls: string[] = [];
        
        for (let i = 0; i < newUrls.length; i++) {
          const tempUrl = newUrls[i];
          
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
              const newPath = getStoragePath(id, imageId, ext || 'jpg');

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

        await prisma.productImage.createMany({
          data: finalImageUrls.map((url, index) => ({
            productId: id,
            imageUrl: url,
            isMain: currentImages.length === 0 && index === 0,
            displayOrder: maxOrder + index + 1,
          }))
        });
      }
    }

    // Manejar atributos si vienen en el body
    if (body.attributes) {
      // Eliminar atributos existentes
      await prisma.productAttribute.deleteMany({
        where: { productId: id }
      });

      // Crear nuevos atributos
      if (body.attributes.length > 0) {
        await prisma.productAttribute.createMany({
          data: body.attributes.map((attr: any) => ({
            productId: id,
            attributeId: attr.attributeId,
            textValue: attr.textValue || null,
            optionId: attr.optionId || null,
          })),
        });
      }
    }

    const product = await prisma.product.update({
      where: { id },
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
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },
        attributes: {
          include: {
            attribute: true,
            option: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un producto
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  } catch {
    // Error silenciado
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
