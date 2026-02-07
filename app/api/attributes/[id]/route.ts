import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// PUT /api/attributes/[id] - Actualizar atributo
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, type, required, displayOrder } = body;

    const attribute = await prisma.attribute.update({
      where: { id: params.id },
      data: {
        name,
        type,
        required,
        displayOrder,
      },
      include: {
        options: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    return NextResponse.json(attribute);
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
  { params }: { params: { id: string } }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    await prisma.attribute.delete({
      where: { id: params.id },
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
