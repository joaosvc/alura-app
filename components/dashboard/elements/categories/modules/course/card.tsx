import Image from "next/image";
import { HTMLProps } from "react";

interface CourseCardProps extends HTMLProps<HTMLDivElement> {
  course: string;
  icon: string;
}

export default function CourseCard({
  course,
  icon,
  ...props
}: CourseCardProps) {
  return (
    <div className="h-42 lg:h-32 w-1/2 lg:w-1/4 p-2" {...props}>
      <div className="h-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
        <div className="h-full flex flex-col lg:flex-row items-center p-4 space-y-4 lg:space-x-4 lg:space-y-0">
          <Image
            src={`course-icons/${icon}`}
            alt={`Icon ${course}`}
            width={40}
            height={40}
          />

          <span className="text-xs break-normal">Curso {course}</span>
        </div>
      </div>
    </div>
  );
}
