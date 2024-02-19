/* eslint-disable react-hooks/exhaustive-deps */
import React, { HTMLProps, useEffect, useRef, useState } from "react";
import { getCourseModules } from "@/app/api/get-course-modules/get-course-modules";
import { setPageBaseTitle } from "@/client/hooks/use-page-title";
import { User } from "@/client/structs/types/next-auth";
import { getVideoData } from "@/app/api/get-video-data/get-video-data";
import WatchContent from "./content";

interface WatchProps extends HTMLProps<HTMLDivElement> {
  user: User;
  courseUuid: string;
}

export interface WatchEpisode {
  episode: number;
  module: {
    identifier: string;
    name: string;
  };
  video: {
    identifier: string;
    name: string;
  };
}

export interface VideoOptions {
  episode: number;
  name: string;
  url: string;
  thumbnail: string;
}

export default function Watch({ user, courseUuid, ...props }: WatchProps) {
  const [episodes, setEpisodes] = useState<WatchEpisode[]>([]);
  const [isAvailable, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingEpisode, setLoadingEpisode] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [videoOptions, setVideoOptions] = useState<VideoOptions>();
  const searchParams = useRef<URLSearchParams>();
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

            setPageBaseTitle(courseName);

            let currentEpisode = 1;
            let episodes = modules.flatMap(({ module, name, videos }) =>
              videos.map((video) => ({
                episode: currentEpisode++,
                module: {
                  identifier: module,
                  name: name,
                },
                video: {
                  identifier: video.video,
                  name: video.name,
                },
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
              setAvailable(false);
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
        setLoadingEpisode(true);

        searchParams.current?.set("episode", episode.toString());
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}?${searchParams.current?.toString()}`
        );

        if (videoOptions) videoOptions.episode = episode;

        const videoData = await getVideoData(
          courseUuid,
          module.identifier,
          video.identifier,
          user.jwtToken
        );

        if (videoData.success) {
          setVideoOptions({
            episode,
            name: video.name,
            url: videoData.body!.url,
            thumbnail: videoData.body!.thumbnail,
          });
        }

        setLoadingEpisode(false);
      }
    };

    fetchData();
  }, [currentEpisode]);

  return (
    <div
      className="w-[90vw] lg:w-[60vw] mx-auto mt-6 space-y-3 rounded-xl mb-4"
      {...props}
    >
      <WatchContent
        videoOptions={videoOptions!}
        episodes={episodes}
        isAvailable={isAvailable}
        loading={loading}
        loadingEpisode={loadingEpisode}
        onEpisodeChange={(episode) => setCurrentEpisode(episode)}
      />
    </div>
  );
}
