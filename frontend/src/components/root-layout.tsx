import { FC } from "react";
import { Outlet } from "react-router-dom";

export const RootLayout: FC = () => {
  return (
    <>
      <main className="flex flex-col p-5">
        <Outlet />
      </main>
      <footer className="text-xs text-zinc-500 p-5 mt-20 relative">
        <p className="text-center">
          Developed by team <strong>2GB</strong> for Xcelerate Competetion.
          Copyrights reserved for relevant parties.
        </p>
      </footer>
    </>
  );
};
