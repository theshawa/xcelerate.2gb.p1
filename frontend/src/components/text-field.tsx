import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { FC, InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

export const TextField: FC<{
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  className?: string;
  error?: string;
}> = ({ inputProps, label, className, error }) => {
  const [passwordShowing, setPasswordShowing] = useState(false);
  const inputComponent =
    inputProps.type === "password" ? (
      <div className="relative flex items-center w-full">
        <input
          {...inputProps}
          type={passwordShowing ? "text" : "password"}
          className={twMerge(
            inputProps.className,
            error
              ? "border-red-400"
              : "border-zinc-950 focus:border-violet-700",
            "bg-zinc-950 border-2 pl-2.5 pr-10  rounded-md h-9  transition-colors duration-200 placeholder:text-zinc-50/20 w-full"
          )}
        />
        <span
          title={passwordShowing ? "Hide password" : "Show password"}
          onPointerDown={() => setPasswordShowing((ps) => !ps)}
          className="absolute right-2.5 cursor-pointer active:scale-95"
          role="button"
        >
          {passwordShowing ? (
            <EyeSlashIcon className="size-5 text-zinc-700" />
          ) : (
            <EyeIcon className="size-5 text-zinc-700" />
          )}
        </span>
      </div>
    ) : (
      <input
        {...inputProps}
        className={twMerge(
          inputProps.className,
          error ? "border-red-400" : "border-zinc-950 focus:border-violet-700",
          "bg-zinc-950 border-2 px-2.5 rounded-md h-9  transition-colors duration-200 placeholder:text-zinc-50/20 w-full"
        )}
      />
    );

  return (
    <div className={twMerge("flex flex-col", className)}>
      <label
        htmlFor={inputProps.id}
        className="font-medium text-sm text-zinc-400 mb-1"
      >
        {label}
      </label>
      {inputComponent}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};
