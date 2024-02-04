import PrismaClient from "@/client/prisma";
import { NextResponse } from "next/server";
import { CreateUserParams } from "./protocols";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const requiredFields: (keyof CreateUserParams)[] = [
      "email",
      "name",
      "lastname",
      "password",
    ];

    for (const field of requiredFields) {
      if (!body?.[field as keyof CreateUserParams]?.length) {
        return NextResponse.json(
          { error: "missing-field", message: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }
    const { email, password } = body as CreateUserParams;

    const existingUser = await PrismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "email-exists",
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await PrismaClient.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
