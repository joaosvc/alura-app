/* eslint-disable react-hooks/exhaustive-deps */
import React, { HTMLProps, useEffect, useRef, useState } from "react";
import { getCourseModules } from "@/app/api/get-course-modules/get-course-modules";
import { setPageBaseTitle } from "@/client/hooks/use-page-title";
import { User } from "@/client/structs/types/next-auth";
import WatchSkeleton from "./skeleton";
import UnavailableBox from "@/components/elements/unavailable-box";
import { motion } from "framer-motion";
import { getVideoPlaylist } from "@/app/api/get-video-playlist/get-video-playlist";
import ReactPlayer from "react-player";

interface WatchProps extends HTMLProps<HTMLDivElement> {
  user: User;
  courseUuid: string;
}

interface WatchEpisode {
  episode: number;
  module: string;
  video: string;
}

export default function Watch({ user, courseUuid, ...props }: WatchProps) {
  const [episodes, setEpisodes] = useState<WatchEpisode[]>([]);
  const [courseName, setCourseName] = useState("");
  const [isAvaliable, setAvaliable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const searchParams = useRef<URLSearchParams>();
  const playerRef = useRef<ReactPlayer>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const fetchModules = async (courseUuid: string, jwtToken: string) => {
        setLoading(true);

        try {
          const modulesResponse = await getCourseModules(courseUuid, jwtToken);

          if (modulesResponse.success) {
            const { courseName, modules } = modulesResponse.body!;

            setCourseName(courseName);
            setPageBaseTitle(courseName);

            let currentEpisode = 1;
            let episodes = modules.flatMap(({ module, videos }) =>
              videos.map((video) => ({
                episode: currentEpisode++,
                module,
                video,
              }))
            );

            searchParams.current = new URLSearchParams(window.location.search);

            const episodeParam = searchParams.current.get("episode") || -1;
            const episodeIndex = episodes.findIndex(
              ({ episode }) => episode === +episodeParam
            );

            if (episodeIndex !== -1 && episodes[episodeIndex]) {
              setCurrentEpisode(episodes[episodeIndex].episode);
            } else {
              if (episodes.length > 0) {
                setCurrentEpisode(episodes[0].episode);
              }
            }

            setEpisodes(episodes);
          } else {
            if (modulesResponse.error === "course-not-found") {
              setAvaliable(false);
              setPageBaseTitle("Curso não encontrado");
            } else {
              throw new Error(modulesResponse.error);
            }
          }
        } catch (error) {
          console.error(`Error fetching modules of this course`, error);
        } finally {
          setLoading(false);
        }
      };

      if (courseUuid && user.jwtToken) {
        fetchModules(courseUuid, user.jwtToken);
      }
    }
  }, [courseUuid, user.jwtToken, episodes, searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentEpisode > 0) {
        if (currentEpisode > episodes.length) {
          return;
        }
        const { episode, module, video } = episodes[currentEpisode - 1];

        searchParams.current?.set("episode", episode.toString());
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}?${searchParams.current?.toString()}`
        );

        const videoResponse = await getVideoPlaylist(courseUuid, module, video);

        if (videoResponse.success && playerRef.current) {
          setVideoUrl(videoResponse.body!);

          console.log(episodes[currentEpisode - 1]);
          console.log({
            videoResponse,
          });
        }
      }
    };

    fetchData();
  }, [currentEpisode]);

  const WatchContent = () => {
    if (loading) {
      return <WatchSkeleton />;
    } else if (!isAvaliable || episodes.length === 0) {
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
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="relative max-w-[1280px] w-full pt-[59%] hidden"></div>
          <ReactPlayer
            ref={playerRef}
            controls={true}
            url={videoUrl}
            width="100%"
            height="100%"
          />
        </div>

        <div className="flex items-center justify-center h-12 pl-4 pr-4 bg-gray-800 rounded-xl overflow-hidden hidden">
          <p className="line-clamp-2 text-xs text-gray-200">{courseName}</p>
        </div>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-[60vw] mx-auto mt-6 space-y-3 rounded-xl" {...props}>
        <WatchContent />
      </div>
    </motion.div>
  );
}