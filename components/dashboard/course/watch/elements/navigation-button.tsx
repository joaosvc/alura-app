import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLProps } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface NavagationButtonProps extends HTMLProps<HTMLDivElement> {
  icon: any;
  disabled: boolean;
  onClick: () => void;
}

interface BackArrowButtonProps extends HTMLProps<HTMLDivElement> {
  disabled: boolean;
  onClick: () => void;
}

export function NavigationButton({
  icon,
  disabled,
  onClick,
  ...props
}: NavagationButtonProps) {
  return (
    <button
      className={`h-8 flex flex-grow items-center justify-center border text-gray-700 bg-gray-200 dark:bg-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
        disabled && "bg-transparent dark:bg-transparent"
      } ${props.className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export function BackArrowButton({ ...props }: BackArrowButtonProps) {
  return <NavigationButton icon={faChevronLeft} {...props} />;
}

export function NextArrowButton({ ...props }: BackArrowButtonProps) {
  return <NavigationButton icon={faChevronRight} {...props} />;
}
