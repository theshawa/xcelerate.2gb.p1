import { useAtom } from "jotai";
import { FC } from "react";
import { authAtom } from "../../atoms";
import { Logo } from "../../components/logo";
export const HomePage: FC = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const logout = () => {
    setAuth(null);
  };
  return (
    <>
      <div className="size-[75vh] lg:size-[75vw] bg-radial from-violet-950/20 to-transparent fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <header className="flex w-full">
        <button
          onClick={logout}
          className="text-zinc-400 text-sm px-2 py-1 rounded-md border border-zinc-700 w-max ml-auto"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-col text-center items-center pt-[15vh] relative">
        <span className="text-zinc-500 mb-5">
          <Logo className="w-52 text-violet-500" />
        </span>
        <h1 className="text-4xl font-bold text-zinc-50">
          Simple. Secure. Protected.
        </h1>
        <p className="text-zinc-400 mt-5 max-w-lg">
          Hello <span>{auth?.username}</span>!👋 Experience protection that
          travels with you. SecureConnect delivers robust security with simple
          authentication, keeping your data safe while providing seamless access
          anywhere, anytime.
        </p>
        <div className="mt-10 flex items-center space-x-5">
          <button
            onClick={() => alert("Let's Get Started!")}
            className="btn w-max"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};
