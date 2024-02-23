/* eslint-disable react-hooks/exhaustive-deps */
import { getVideoData } from "@/app/api/get-video-data/get-video-data";
import { getVideoDataFrom } from "@/client/hooks/video-data-identifier";
import { LastWatched } from "@/client/models/watched/last-watched";
import { useEffect, useRef, useState } from "react";
import { User } from "@/client/structs/types/next-auth";
import { motion } from "framer-motion";
import Link from "next/link";

interface LastWatchedItemProps {
  user: User;
  item: LastWatched;
}

interface VideoData {
  name: string;
  thumbnail: string;
  courseId: string;
  episode: number;
}

export default function LastWatchedItem({ user, item }: LastWatchedItemProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [videoData, setVideoData] = useState<VideoData>();

  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const fetchVideoData = async () => {
        const { courseUuid, module, video, episode } = getVideoDataFrom(
          item.videoIdentifier
        );
        setLoading(true);

        const videoDataResponse = await getVideoData(
          courseUuid,
          module,
          video,
          user.jwtToken
        );

        if (videoDataResponse.success) {
          setVideoData({
            name: videoDataResponse?.body!.name,
            thumbnail: videoDataResponse?.body!.thumbnail,
            courseId: courseUuid,
            episode: episode,
          });
          setLoading(false);
        }
      };

      fetchVideoData();
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse relative max-w-[1280px] w-52 pt-[56.25%]"></div>
    );
  }

  return (
    <Link
      href={`/watch/${btoa(videoData?.courseId!)}?episode=${
        videoData?.episode
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-between rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden relative max-w-[1280px] w-52 pt-[56.25%]"
        style={{
          backgroundImage: `url(${videoData?.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center pt-1 pr-2 pl-2 text-gray-600 font-bold dark:text-white text-sm dark:bg-gradient-to-t dark:from-transparent dark:to-gray-700">
          {videoData?.episode} - {videoData?.name}
        </div>

        <div className="h-[0.28rem]">
          <div
            className="h-full bg-red-600"
            style={{
              width: `${(item.progress / item.totalProgress) * 100}%`,
            }}
          ></div>
        </div>
      </motion.div>
    </Link>
  );
}
