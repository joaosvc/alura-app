/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import WatchNavigation from "./elements/watch-navigation";
import WatchVideo from "./watch-video";
import { VideoOptions, WatchEpisode } from "./watch";
import { User } from "@/client/structs/types/next-auth";

interface WatchContentProps {
  user: User;
  videoOptions: VideoOptions;
  episodes: WatchEpisode[];
  isAvailable: boolean;
  loading: boolean;
  loadingEpisode: boolean;
  onEpisodeChange: (episode: number) => void;
}

const WatchContent = ({
  user,
  videoOptions,
  episodes,
  isAvailable,
  loading,
  loadingEpisode,
  onEpisodeChange,
}: WatchContentProps) => {
  const handleEpisodeChange = (episode: number) => {
    if (episode >= 1 && episode <= episodes.length) {
      onEpisodeChange(episode);
    }
  };

  return (
    <>
      <WatchVideo
        user={user}
        loading={loading}
        loadingEpisode={loadingEpisode}
        isAvailable={isAvailable}
        videoOptions={videoOptions}
        episodes={episodes}
        handleEpisodeChange={handleEpisodeChange}
      />

      <WatchNavigation
        episodes={episodes}
        currentEpisode={videoOptions?.episode!}
        onSelectEpisode={handleEpisodeChange}
      />
    </>
  );
};

export default React.memo(WatchContent);
