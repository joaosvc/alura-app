/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import WatchNavigation from "./elements/watch-navigation";
import WatchVideo from "./watch-video";
import { VideoOptions, WatchEpisode } from "./watch";

interface WatchContentProps {
  videoOptions: VideoOptions;
  episodes: WatchEpisode[];
  isAvailable: boolean;
  loading: boolean;
  loadingEpisode: boolean;
  onEpisodeChange: (episode: number) => void;
}

const WatchContent = ({
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
