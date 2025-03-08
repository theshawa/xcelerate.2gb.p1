import { FC } from "react";
import { twMerge } from "tailwind-merge";

export const FormButton: FC<{
  children: string;
  loading?: boolean;
  className?: string;
}> = ({ children, loading, className }) => {
  const content = loading ? (
    <div className="m-auto size-4 rounded-full border-3 border-y-violet-50 border-x-transparent animate-spin"></div>
  ) : (
    children
  );
  return (
    <button
      className={twMerge("btn mt-5", className)}
      disabled={loading}
      type="submit"
    >
      {content}
    </button>
  );
};
