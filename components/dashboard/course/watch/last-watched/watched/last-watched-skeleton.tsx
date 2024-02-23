export default function LastWatchedSkeleton() {
  return (
    <>
      <div className="w-40 lg:w-52 h-7 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>

      <div className="relative mt-4 w-full">
        <div className="grid grid-flow-col w-full h-full overflow-hidden space-x-2 justify-start">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse w-[13rem] h-[7.6rem]"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
