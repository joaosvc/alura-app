import { getModules } from "@/app/api/get-modules/get-modules";
import { Module } from "@/client/models/category/module";
import { User } from "@/client/structs/types/next-auth";
import { HTMLProps, useEffect, useState } from "react";

interface ModulesManagerProps extends HTMLProps<HTMLDivElement> {
  user: User;
  category?: string | null;
  back: () => void;
}

export default function ModulesManager({
  user,
  category,
  back,
  ...props
}: ModulesManagerProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async (category: string, jwtToken: string) => {
      setCount((prev) => prev + 1);
      setModules([]);

      try {
        if (category && user.jwtToken) {
          setModules(await getModules(category, user.jwtToken));
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category && user.jwtToken) {
      fetchData(category, user.jwtToken);
    }
  }, [category, user.jwtToken]);

  const NavigationButtons = () => {
    return (
      <div className="flex flex-row justify-between mb-6">
        <p
          className="text-xs p-2 border border-gray-600 rounded-md cursor-pointer"
          onClick={back}
        >
          Categorias
        </p>
      </div>
    );
  };

  return (
    <div className="w-full" {...props}>
      <NavigationButtons />

      <p>Category: {category}</p>
      <p>Count: {count}</p>

      <pre>
        <code>{JSON.stringify(modules, null, 2)}</code>
      </pre>
    </div>
  );
}
