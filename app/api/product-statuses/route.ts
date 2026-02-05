import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Obtener todos los estados de productos activos
export async function GET() {
  try {
    const statuses = await prisma.productStatus.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
    return NextResponse.json(statuses);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los estados" },
      { status: 500 }
    );
  }
}
