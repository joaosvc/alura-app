import { LabelHTMLAttributes } from "react";

export default function FormLabel(
  props: LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      {...props}
    >
      {props.children}
    </label>
  );
}
