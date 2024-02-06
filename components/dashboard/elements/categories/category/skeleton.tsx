export default function CategorySkeleton() {
  return [...Array(8)].map((_, index) => (
    <div key={index} className="w-1/2 lg:w-1/4 p-2 mb-5">
      <div className="p-3 lg:p-6 h-full bg-gray-100 dark:bg-gray-800 rounded cursor-pointer animate-pulse">
        <div className="w-32 h-5 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
        <div className="w-36 lg:w-40 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  ));
}
