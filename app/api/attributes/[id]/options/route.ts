import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// POST /api/attributes/[id]/options - Crear opción para atributo
export async function POST(
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
    const { value, displayOrder } = body;

    const option = await prisma.attributeOption.create({
      data: {
        attributeId: id,
        value,
        displayOrder: displayOrder || 0,
      },
    });

    return NextResponse.json(option, { status: 201 });
  } catch (error) {
    console.error("Error creating attribute option:", error);
    return NextResponse.json(
      { error: "Error al crear opción" },
      { status: 500 }
    );
  }
}
