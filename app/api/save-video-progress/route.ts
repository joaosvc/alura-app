import PrismaClient from "@/client/prisma";
import { NextResponse } from "next/server";
import { SaveVideoProgressParams } from "./protocols";

export async function POST(request: Request) {
  const body = await request.json();

  const requiredFields: (keyof SaveVideoProgressParams)[] = [
    "userId",
    "progress",
    "totalProgress",
    "videoIdentifier",
  ];

  for (const field of requiredFields) {
    if (!body?.[field as keyof SaveVideoProgressParams]) {
      return NextResponse.json(
        { error: "missing-field", message: `Field ${field} is required` },
        { status: 400 }
      );
    }
  }

  const { userId, progress, totalProgress, videoIdentifier } = body;

  try {
    await PrismaClient.videoProgress.upsert({
      where: {
        userId_videoIdentifier: {
          userId,
          videoIdentifier,
        },
      },
      create: {
        userId: userId,
        progress: progress,
        totalProgress: totalProgress,
        videoIdentifier: videoIdentifier,
      },
      update: {
        progress: progress,
      },
    });

    return NextResponse.json(
      {
        message: "Video progress saved successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving video progress." },
      { status: 500 }
    );
  }
}
