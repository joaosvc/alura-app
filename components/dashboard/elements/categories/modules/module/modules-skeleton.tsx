export default function ModulesSkeleton() {
  return (
    <>
      <div className="w-40 lg:w-52 h-6 bg-gray-100 dark:bg-gray-800 mb-2 ml-2 rounded animate-pulse"></div>

      <div className="w-full flex flex-wrap mx-auto max-w-full">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="w-1/2 lg:w-1/4 p-2 mb-5">
            <div className="flex flex-col lg:flex-row p-3 lg:p-3 h-full bg-gray-100 dark:bg-gray-800 rounded cursor-pointer animate-pulse lg:space-x-2">
              <div className="w-32 lg:w-14 h-5 lg:h-20 bg-gray-300 dark:bg-gray-700 mb-2 lg:mb-0 rounded"></div>
              <div className="w-36 lg:w-40 h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
