import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Crear producto
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const product = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description,
        state: body.state,
        condition: body.condition,
        measurements: body.measurements,
        price: parseInt(body.price),
        images: body.images,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}

// GET - Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}
