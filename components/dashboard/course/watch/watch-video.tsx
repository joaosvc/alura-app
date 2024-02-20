import UnavailableBox from "@/components/elements/unavailable-box";
import WatchSkeleton from "./skeleton";
import Player from "./elements/react-player";
import { BackArrowButton, NextArrowButton } from "./elements/navigation-button";
import { VideoOptions, WatchEpisode } from "./watch";

interface WatchVideoProps {
  loading: boolean;
  loadingEpisode: boolean;
  videoOptions: VideoOptions;
  episodes: WatchEpisode[];
  isAvailable: boolean;
  handleEpisodeChange: (episode: number) => void;
}

export default function WatchVideo({
  loading,
  loadingEpisode,
  videoOptions,
  episodes,
  isAvailable,
  handleEpisodeChange,
}: WatchVideoProps) {
  if (loading || loadingEpisode) {
    return <WatchSkeleton />;
  } else if (!isAvailable || episodes.length === 0) {
    return (
      <div className="mt-32">
        <UnavailableBox>
          {episodes.length === 0
            ? "Nenhum episódio disponível"
            : "Curso não encontrado"}
        </UnavailableBox>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative max-w-[1280px] w-full pt-[56.25%]">
        <div className="absolute top-0 left-0 w-full h-full">
          <Player
            url={videoOptions?.url!}
            thumbnail={videoOptions?.thumbnail}
          />
        </div>
      </div>

      <div className="flex items-center justify-between h-12 pl-6 pr-6 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
        <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-200">
          {videoOptions.episode} - {videoOptions.name}
        </p>

        <div className="flex flex-row space-x-3 items-center">
          <BackArrowButton
            disabled={videoOptions.episode === 1}
            onClick={() => handleEpisodeChange(videoOptions.episode - 1)}
          />

          <NextArrowButton
            disabled={videoOptions.episode === episodes.length}
            onClick={() => handleEpisodeChange(videoOptions.episode + 1)}
          />
        </div>
      </div>
    </>
  );
}
