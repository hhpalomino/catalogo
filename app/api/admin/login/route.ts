import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Find user with admin role
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.role !== "admin" || !user.isActive) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Verify password hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Update lastLogin timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
