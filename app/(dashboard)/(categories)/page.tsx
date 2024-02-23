"use client";

import { useCurrentUser } from "@/client/hooks/use-current-user";
import Categories from "@/components/dashboard/categories/categories";
import LastVideosWatched from "@/components/dashboard/course/watch/last-watched/last-videos-watched";

export default function Dashboard() {
  const user = useCurrentUser();

  return (
    <div className="mt-10 lg:mt-16">
      <div className="mx-auto max-w-sm lg:max-w-5xl p-2">
        <LastVideosWatched user={user} count={10} />
      </div>

      <Categories user={user} />
    </div>
  );
}
