import Image from "next/image";
import { HTMLProps } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface CourseCardProps extends HTMLProps<HTMLDivElement> {
  course: string;
  animation?: boolean;
  courseData: {
    uuid: string;
    icon: string;
  };
}

export const CourseCardWithAnimation = ({
  course,
  courseData,
}: CourseCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, marginTop: 10 }}
      animate={inView ? { opacity: 1, marginTop: 0 } : {}}
      transition={{ duration: 0.2 }}
    >
      <CourseCard course={course} courseData={courseData} />
    </motion.div>
  );
};

export default function CourseCard({
  course,
  courseData,
  animation,
  ...props
}: CourseCardProps) {
  if (animation) {
    return <CourseCardWithAnimation course={course} courseData={courseData} />;
  }

  return (
    <div {...props} className="h-36 lg:h-32 p-2">
      <div className="h-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
        <div className="h-full flex flex-col lg:flex-row items-center justify-around p-3 pb-2 pt-2 lg:p-3 lg:space-x-4">
          <Image
            src={`/course-icons/${courseData.icon}`}
            alt={`Icon ${course}`}
            width={40}
            height={40}
            className="w-auto h-7 lg:h-auto lg:w-8"
          />

          <span className="text-xs break-normal">Curso {course}</span>
        </div>
      </div>
    </div>
  );
}
