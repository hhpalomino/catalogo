import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// GET /api/attributes - Listar todos los atributos con opciones
export async function GET() {
  try {
    const attributes = await prisma.attribute.findMany({
      include: {
        options: {
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(attributes);
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return NextResponse.json(
      { error: "Error al obtener atributos" },
      { status: 500 }
    );
  }
}

// POST /api/attributes - Crear nuevo atributo
export async function POST(request: Request) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, type, required, displayOrder, options } = body;

    const attribute = await prisma.attribute.create({
      data: {
        name,
        type,
        required: required || false,
        displayOrder: displayOrder || 0,
        options: type === "SELECT" && options ? {
          create: options.map((opt: any, index: number) => ({
            value: opt.value,
            displayOrder: opt.displayOrder || index,
          })),
        } : undefined,
      },
      include: {
        options: true,
      },
    });

    return NextResponse.json(attribute, { status: 201 });
  } catch (error) {
    console.error("Error creating attribute:", error);
    return NextResponse.json(
      { error: "Error al crear atributo" },
      { status: 500 }
    );
  }
}
