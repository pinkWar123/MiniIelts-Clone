// src/contexts/UserContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../types/Model/User";
import { getUserByToken } from "../services/authentication";

export interface UserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await getUserByToken();
      console.log("Get user by token:", res.data);
      setUser(res.data);
    };
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
