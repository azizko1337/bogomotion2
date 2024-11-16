"use client";

import type { Dispatch, SetStateAction } from "react";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type User =
  | {
      email: string;
    }
  | null
  | "loading";

const AuthContext = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}>({
  user: null,
  setUser: (() => {}) as Dispatch<SetStateAction<User>>,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>("loading");

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/auth/user", {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data || null);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
