import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import zxcvbn from "zxcvbn";

const Message: FC<{ message: string; ok: boolean }> = ({ message, ok }) => {
  return (
    <div className={twMerge("flex", ok ? "text-green-400" : "text-zinc-500")}>
      <span className="w-[20px] mr-[5px]">
        {ok ? (
          <CheckCircleIcon className="size-4" />
        ) : (
          <XCircleIcon className="size-4" />
        )}
      </span>
      <p className="w-[calc(100%-25px)] mt-[1px]">{message}</p>
    </div>
  );
};
export const PasswordStrength: FC<{ password?: string }> = ({
  password = "",
}) => {
  const { score, feedback } = useMemo(() => {
    const result = zxcvbn(password);
    console.log(result);
    return result;
  }, [password]);
  return (
    <div className="mb-2 text-xs flex flex-col space-y-1 pb-3">
      <Message message="Least 8 characters" ok={password.length >= 8} />
      <Message
        message="Lowercase (a-z) and uppercase (A-Z)"
        ok={/[a-z]/.test(password) && /[A-Z]/.test(password)}
      />
      <Message
        message="Least one number (0-9) or a symbol"
        ok={/[0-9!@#$%^&*]/.test(password)}
      />
      <div className="mt-2.5 w-full h-1 rounded-full bg-zinc-800">
        <div
          className={twMerge(
            "h-full rounded-full transition-all duration-300 w-full",
            score < 2
              ? "bg-red-400"
              : score < 4
              ? "bg-yellow-400"
              : "bg-green-400"
          )}
          style={{ width: `${(score / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs mt-1 text-yellow-400">{feedback.warning}</p>
    </div>
  );
};
