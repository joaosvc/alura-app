/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { User } from "@/client/structs/types/next-auth";

interface PlayerProps {
  user: User;
  url: string;
  thumbnail: string;
  videoIdentifier: string;
}

const Player = ({ user, url, thumbnail, videoIdentifier }: PlayerProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);
  const savingProgress = useRef<boolean>(false);

  const handleProgress = async (state: OnProgressProps) => {
    if (progress !== state.playedSeconds) {
      setProgress(state.playedSeconds);
    }
  };

  const handleDuration = (duration: number) => {
    if (totalProgress !== duration) {
      setTotalProgress(duration);
    }
  };

  useEffect(() => {
    if (progress > 2 && totalProgress > 0 && progress < totalProgress) {
      const saveProgress = async () => {
        if (savingProgress.current) return;
        savingProgress.current = true;

        const response = await fetch("/api/save-video-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            progress,
            totalProgress,
            videoIdentifier,
          }),
        });

        savingProgress.current = false;

        if (!response.ok) {
          console.error("Failed to save video progress");
        }
      };

      saveProgress();
    }
  }, [progress]);

  return (
    <>
      <ReactPlayer
        ref={playerRef}
        controls={true}
        url={url}
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              poster: thumbnail,
              controlsList: "nodownload",
            },
          },
        }}
        progressInterval={1000}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </>
  );
};

export default React.memo(Player);
