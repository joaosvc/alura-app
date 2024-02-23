import PrismaClient from "@/client/prisma";
import { NextResponse } from "next/server";
import { getLastWatchedVideosParams } from "./protocols";

export async function POST(request: Request) {
  const body = await request.json();

  const requiredFields: (keyof getLastWatchedVideosParams)[] = ["userId"];

  for (const field of requiredFields) {
    if (!body?.[field as keyof getLastWatchedVideosParams]) {
      return NextResponse.json(
        { error: "missing-field", message: `Field ${field} is required` },
        { status: 400 }
      );
    }
  }

  const { userId, count } = body;

  try {
    const lastWatched = await PrismaClient.videoProgress.findMany({
      where: {
        userId,
      },
      take: parseInt(count),
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        progress: true,
        totalProgress: true,
        videoIdentifier: true,
      },
    });

    return NextResponse.json(lastWatched, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving video progress." },
      { status: 500 }
    );
  }
}
