import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FC, useEffect, useState } from "react";

export const CapslockWarning: FC = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setIsCapsLockOn(e.getModifierState("CapsLock"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isCapsLockOn) return null;

  return (
    <p className="mt-3 text-xs text-yellow-500 inline-flex items-center space-x-1">
      <span>
        <InformationCircleIcon className="size-4" />
      </span>
      <span>CAPSLOCK is ON</span>
    </p>
  );
};
