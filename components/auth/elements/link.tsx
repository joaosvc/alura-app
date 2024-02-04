import { AnchorHTMLAttributes } from "react";

export default function FormLink(
  props: AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return (
    <a
      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
      {...props}
    >
      {props.children}
    </a>
  );
}
