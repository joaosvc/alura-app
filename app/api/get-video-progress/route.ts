import PrismaClient from "@/client/prisma";
import { NextResponse } from "next/server";
import { GetVideoProgressParams } from "./protocols";

export async function POST(request: Request) {
  const body = await request.json();

  const requiredFields: (keyof GetVideoProgressParams)[] = [
    "userId",
    "videoIdentifier",
  ];

  for (const field of requiredFields) {
    if (!body?.[field as keyof GetVideoProgressParams]) {
      return NextResponse.json(
        { error: "missing-field", message: `Field ${field} is required` },
        { status: 400 }
      );
    }
  }

  const { userId, videoIdentifier } = body;

  try {
    const videoProgress = await PrismaClient.videoProgress.findUnique({
      where: {
        userId,
        videoIdentifier,
      },
    });

    if (!videoProgress) {
      return NextResponse.json(
        { data: null, message: "Video progress not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          progress: videoProgress.progress,
          totalProgress: videoProgress.totalProgress,
        },
        message: "Video progress retrieved successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving video progress." },
      { status: 500 }
    );
  }
}
