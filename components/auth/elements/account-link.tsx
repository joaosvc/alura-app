import { HTMLProps } from "react";
import FormLink from "./link";

interface IFormAccountLinkProps {
  holder: string;
}

export default function FormAccountLink(
  props: HTMLProps<HTMLParagraphElement> & IFormAccountLinkProps
) {
  return (
    <p
      className="text-sm font-light text-gray-500 dark:text-gray-400"
      {...props}
    >
      {props.children + " "}

      <FormLink href="signin">{props.holder}</FormLink>
    </p>
  );
}
