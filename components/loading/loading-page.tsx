import { FaCode } from "react-icons/fa";

export default function LoadingPage() {
  return (
    <div className="w-screen h-screeen z-50 flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 absolute">
      <div className="animate-pulse">
        <FaCode className="text-6xl text-blue-500" />
      </div>
    </div>
  );
}
