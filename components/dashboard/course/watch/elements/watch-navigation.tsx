import { useState, useLayoutEffect } from "react";
import { BackArrowButton, NextArrowButton } from "./navigation-button";
import { WatchEpisode } from "../watch";

interface WatchNavigationProps {
  episodes: WatchEpisode[];
  currentEpisode: number;
  onSelectEpisode: (episode: number) => void;
}

export default function WatchNavigation({
  episodes,
  currentEpisode,
  onSelectEpisode,
}: WatchNavigationProps) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const startIndex = page * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, episodes.length);
  const totalPages = Math.ceil(episodes.length / itemsPerPage);
  const slicedEpisodes = episodes.slice(startIndex, endIndex);

  useLayoutEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(
        window.innerWidth < 800 ? 10 : window.innerWidth < 1000 ? 15 : 20
      );
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="flex flex-row items-center justify-between space-x-1">
      <div className="w-6">
        <BackArrowButton
          disabled={page === 0}
          onClick={prevPage}
          className="w-full"
        />
      </div>

      <div className="flex flex-row items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        {slicedEpisodes.map((episode, index) => {
          return (
            <div
              key={index}
              className={`flex items-center justify-center p-2 hover:bg-gray-300 hover:dark:bg-gray-700 cursor-pointer ${
                episode.episode === currentEpisode
                  ? "bg-gray-300 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => onSelectEpisode(episode.episode)}
            >
              <p className="text-xs text-gray-700 dark:text-gray-200">
                {episode.episode}
              </p>
            </div>
          );
        })}
      </div>

      <div className="w-6">
        <NextArrowButton
          disabled={page === totalPages - 1}
          onClick={nextPage}
          className="w-full"
        />
      </div>
    </div>
  );
}
