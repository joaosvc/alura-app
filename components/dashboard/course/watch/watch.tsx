import { getCourseModules } from "@/app/api/get-course-modules/get-course-modules";
import { setPageBaseTitle } from "@/client/hooks/use-page-title";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useRef, useState } from "react";

interface WatchProps extends HTMLProps<HTMLDivElement> {
  user: User;
  courseUuid: string;
}

export default function Watch({ user, courseUuid, ...props }: WatchProps) {
  const [modules, setModules] = useState({});
  const [courseName, setCourseName] = useState("");
  const [isAvaliable, setAvaliable] = useState(true);
  const [loading, setLoading] = useState(true);

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
            setModules(modules);
            setPageBaseTitle(courseName);
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
  }, [courseUuid, user.jwtToken]);

  return (
    <div className="flex flex-wrap mx-auto max-w-sm lg:max-w-5xl" {...props}>
      <div className="w-full flex mt-40 items-center justify-center">
        <h1>{loading ? "Carregando dados..." : courseName}</h1>
      </div>
    </div>
  );
}
