/* eslint-disable react-hooks/exhaustive-deps */
import getLastWatchedVideos from "@/app/api/get-last-watched-videos/get-last-watched-videos";
import { LastWatched } from "@/client/models/watched/last-watched";
import { User } from "@/client/structs/types/next-auth";
import { useEffect, useRef, useState } from "react";
import LastWatchedContent from "./watched/last-watched-content";
import LastWatchedSkeleton from "./watched/last-watched-skeleton";

interface LastVideosWatchedProps {
  user: User;
  count: number;
}

export default function LastVideosWatched({
  user,
  count,
}: LastVideosWatchedProps) {
  const [lastWatched, setLastWatched] = useState<LastWatched[]>([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const fetchLastWatched = async (userId: number) => {
        setLoading(true);

        try {
          const watchedResponse = await getLastWatchedVideos(userId, count);

          if (watchedResponse.success) {
            setLastWatched(watchedResponse.body!);
          }
        } catch (error) {
          console.error(`Error fetching last watched`, error);
        } finally {
          setLoading(false);
        }
      };

      if (user.id) {
        fetchLastWatched(user.id);
      }
    }
  }, []);

  if (loading) {
    return <LastWatchedSkeleton />;
  }

  return (
    <LastWatchedContent
      user={user}
      loading={loading}
      lastWatched={lastWatched}
    />
  );
}
