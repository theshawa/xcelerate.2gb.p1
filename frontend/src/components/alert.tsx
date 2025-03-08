import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { FC, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Alert: FC<{
  children: ReactNode;
  type: "success" | "error";
  className?: string;
}> = ({ children, type, className }) => {
  const themes = {
    success: "bg-emerald-950 text-emerald-400",
    error: "bg-red-950 text-red-400",
  };
  const [showing, setShowing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowing(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showing) return null;

  return (
    <div
      role="alert"
      onPointerDown={() => {
        setShowing(false);
      }}
      className={twMerge(
        "p-2 text-sm rounded-md cursor-pointer flex items-start",
        themes[type],
        className
      )}
    >
      <span className="">
        {type === "success" ? (
          <CheckCircleIcon className="size-5" />
        ) : (
          <ExclamationCircleIcon className="size-5" />
        )}
      </span>
      <p className="flex-1 ml-1">{children}</p>
    </div>
  );
};
