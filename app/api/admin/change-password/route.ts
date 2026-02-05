import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("admin-session");

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 4 caracteres" },
        { status: 400 }
      );
    }

    // Get admin user
    const user = await prisma.user.findUnique({
      where: { username: "admin" },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Contraseña actual incorrecta" },
        { status: 401 }
      );
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
