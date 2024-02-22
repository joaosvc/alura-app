/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { User } from "@/client/structs/types/next-auth";
import saveVideoProgress from "@/app/api/save-video-progress/save-video-progress";
import getVideoProgress from "@/app/api/get-video-progress/get-video-progress";

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
  const retrievedProgress = useRef<number>(0);

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
    if (playerRef.current && retrievedProgress.current < 1) {
      getVideoProgress(user.id, videoIdentifier).then(
        (data) => (retrievedProgress.current = data?.progress!)
      );
    }
  }, []);

  const handleReady = () => {
    if (retrievedProgress.current > 0 && progress < 1) {
      setProgress(retrievedProgress.current);
      playerRef?.current?.seekTo(retrievedProgress.current);
    }
  };

  useEffect(() => {
    if (progress > 1 && totalProgress > 0 && progress < totalProgress - 1) {
      if (savingProgress.current) {
        return;
      }
      savingProgress.current = true;

      saveVideoProgress(user.id, progress, totalProgress, videoIdentifier).then(
        () => (savingProgress.current = false)
      );
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
        onReady={handleReady}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </>
  );
};

export default React.memo(Player);
