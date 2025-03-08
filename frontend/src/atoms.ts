import { atom } from "jotai";
import { AuthData } from "./types";

export const authAtom = atom<AuthData | null>(null);
