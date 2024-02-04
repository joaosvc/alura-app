import { ButtonHTMLAttributes } from "react";

export default function FormButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`flex-grow border text-gray-700 bg-gray-50 dark:bg-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
