import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// PUT /api/attributes/[id] - Actualizar atributo
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, type, required, displayOrder, options } = body;

    console.log("PUT /api/attributes/[id]", {
      id,
      name,
      type,
      required,
      displayOrder,
      optionsCount: options?.length || 0,
      options: options,
    });

    // Primero actualizar el atributo sin las opciones
    const attribute = await prisma.attribute.update({
      where: { id },
      data: {
        name,
        type,
        required,
        displayOrder,
      },
    });

    // Si el atributo es SELECT, manejar las opciones
    if (type === "SELECT") {
      // Eliminar las opciones existentes
      const deleteResult = await prisma.attributeOption.deleteMany({
        where: { attributeId: id },
      });

      console.log("Deleted options:", deleteResult.count);

      // Crear las nuevas opciones si existen
      if (options && Array.isArray(options) && options.length > 0) {
        const createResult = await prisma.attributeOption.createMany({
          data: options.map((opt: { value: string; displayOrder: number }, index: number) => ({
            attributeId: id,
            value: opt.value,
            displayOrder: opt.displayOrder ?? index,
          })),
        });

        console.log("Created options:", createResult.count);
      }
    }

    // Obtener el atributo con sus opciones actualizadas
    const updatedAttribute = await prisma.attribute.findUnique({
      where: { id },
      include: {
        options: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    return NextResponse.json(updatedAttribute);
  } catch (error) {
    console.error("Error updating attribute:", error);
    return NextResponse.json(
      { error: "Error al actualizar atributo" },
      { status: 500 }
    );
  }
}

// DELETE /api/attributes/[id] - Eliminar atributo
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.attribute.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting attribute:", error);
    return NextResponse.json(
      { error: "Error al eliminar atributo" },
      { status: 500 }
    );
  }
}
