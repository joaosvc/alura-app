"use client";

import { getAtobURIDecode } from "@/client/hooks/get-atob-decode";
import { useCurrentUser } from "@/client/hooks/use-current-user";
import Watch from "@/components/dashboard/course/watch/watch";

interface WatchCourseProps {
  params: {
    uuid: string;
  };
}

export default function WatchCourse({ params }: WatchCourseProps) {
  const user = useCurrentUser();
  const uuid = getAtobURIDecode(params.uuid);

  return <Watch user={user} courseUuid={uuid} />;
}
