import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, STORAGE_BUCKET, getStoragePath, getPublicUrl } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

// Tipos soportados y tamaño máximo
const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// POST - Subir imagen
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const productId = formData.get("productId") as string;

    // Validaciones
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: "No productId provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIMES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: jpg, png, webp" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 5MB" },
        { status: 400 }
      );
    }

    // Siempre usar carpeta temporal para nuevas subidas
    // Las fotos se moverán a su ubicación final cuando se guarde el producto
    const tempFolderId = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Solo verificar que el producto existe si NO es nuevo (para validación)
    if (productId !== "new") {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
    }

    // Convertir archivo a buffer
    const buffer = await file.arrayBuffer();

    // Generar ID para la imagen
    const imageId = crypto.randomUUID();
    const ext = file.type.split("/")[1];
    const storagePath = getStoragePath(tempFolderId, imageId, ext);

    // Subir a Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Generar URL pública
    const imageUrl = getPublicUrl(storagePath);

    // Siempre retornar la URL sin crear registro en BD
    // El registro se creará cuando se guarde/actualice el producto
    return NextResponse.json({
      success: true,
      image: {
        id: imageId,
        imageUrl,
        isMain: false,
        displayOrder: 0,
      },
      url: imageUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar imagen
export async function DELETE(req: NextRequest) {
  try {
    const { imageId, productId } = await req.json();

    if (!imageId || !productId) {
      return NextResponse.json(
        { error: "imageId and productId required" },
        { status: 400 }
      );
    }

    // Obtener imagen de BD
    const image = await prisma.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Obtener extensión de la URL
    const ext = image.imageUrl.split(".").pop();
    const storagePath = `${productId}/${imageId}.${ext}`;

    // Eliminar de Storage
    const { error: deleteError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .remove([storagePath]);

    if (deleteError) {
      console.error("Storage delete error:", deleteError);
      // Continuar incluso si falla el storage
    }

    // Eliminar de BD
    await prisma.productImage.delete({
      where: { id: imageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
