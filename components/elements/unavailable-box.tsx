interface UnavailableBoxProps {
  children: string;
}

export default function UnavailableBox({ children }: UnavailableBoxProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12 lg:w-full flex items-center justify-center p-6 pr-3 pl-3 text-base text-gray-700 dark:text-gray-50 rounded-md bg-gray-100 dark:bg-gray-800">
        <p>{children}</p>
      </div>
    </div>
  );
}
