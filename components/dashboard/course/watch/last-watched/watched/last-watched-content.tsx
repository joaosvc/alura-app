import { LastWatched } from "@/client/models/watched/last-watched";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import LastWatchedItems from "./items/last-watched-items";
import { User } from "@/client/structs/types/next-auth";

interface LastWatchedContentProps {
  user: User;
  loading: boolean;
  lastWatched: LastWatched[];
}

export default function LastWatchedContent({
  user,
  loading,
  lastWatched,
}: LastWatchedContentProps) {
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(false);
  const watchContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = watchContainer.current;

    if (container && !loading) {
      const handleScroll = () => {
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(
          container.scrollWidth > container.scrollLeft + container.clientWidth
        );
      };

      container.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loading]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Continue assistindo</h2>
      </div>

      <div className="relative mt-4 w-full">
        {lastWatched.length === 0 ? (
          <>
            {" "}
            <div
              className="grid grid-flow-col w-full h-full overflow-x-auto md:overflow-hidden overscroll-x-auto space-x-2 justify-start hide-scrollbar"
              ref={watchContainer}
            >
              <LastWatchedItems user={user} items={lastWatched} />
            </div>
            {showLeftButton && (
              <div className="absolute top-0 left-0 h-full flex items-center bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent">
                <button
                  onClick={() => {
                    watchContainer.current?.scrollBy({
                      left: -watchContainer.current?.offsetWidth,
                      behavior: "smooth",
                    });
                  }}
                  className="px-4 h-full flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none rounded-l-full"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              </div>
            )}
            {showRightButton && (
              <div className="absolute top-0 right-0 h-full flex items-center bg-gradient-to-l from-gray-200 dark:from-gray-800 to-transparent">
                <button
                  onClick={() => {
                    watchContainer.current?.scrollBy({
                      left: watchContainer.current?.offsetWidth,
                      behavior: "smooth",
                    });
                  }}
                  className="px-4 h-full flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none rounded-l-full"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-[4rem] bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="text-gray-500 dark:text-gray-300">
              Você ainda não assistiu nenhum vídeo
            </p>
          </div>
        )}
      </div>
    </>
  );
}
