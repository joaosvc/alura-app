import { InputHTMLAttributes } from "react";

interface IFormInputProps {
  error?: string;
}

export default function FormInput(
  props: InputHTMLAttributes<HTMLInputElement> & IFormInputProps
) {
  return (
    <input
      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
        props.disabled && "cursor-not-allowed"
      } ${
        props.error &&
        "border-red-500 focus:border-red-600 dark:border-red-600 dark:focus:border-red-500"
      }`}
      {...props}
      required
    />
  );
}
