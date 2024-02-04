import { HTMLProps } from "react";
export default function FormError(props: HTMLProps<HTMLParagraphElement>) {
  return (
    <p className="text-red-500 text-sm border-l-2 border-red-500 p-2 mb-4 rounded">
      {props.children}
    </p>
  );
}
