import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// DELETE /api/attributes/[id]/options/[optionId] - Eliminar opción
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; optionId: string } }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    await prisma.attributeOption.delete({
      where: { id: params.optionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting attribute option:", error);
    return NextResponse.json(
      { error: "Error al eliminar opción" },
      { status: 500 }
    );
  }
}

// PUT /api/attributes/[id]/options/[optionId] - Actualizar opción
export async function PUT(
  request: Request,
  { params }: { params: { id: string; optionId: string } }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { value, displayOrder } = body;

    const option = await prisma.attributeOption.update({
      where: { id: params.optionId },
      data: {
        value,
        displayOrder,
      },
    });

    return NextResponse.json(option);
  } catch (error) {
    console.error("Error updating attribute option:", error);
    return NextResponse.json(
      { error: "Error al actualizar opción" },
      { status: 500 }
    );
  }
}
