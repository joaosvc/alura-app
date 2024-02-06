import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

export default function FormLink(
  props: AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return (
    <Link
      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
      {...props}
      href={props.href!}
    >
      {props.children}
    </Link>
  );
}
