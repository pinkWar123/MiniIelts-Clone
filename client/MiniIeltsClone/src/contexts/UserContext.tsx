// src/contexts/UserContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../types/Model/User";
import { getUserByToken } from "../services/authentication";
import { isAxiosError } from "axios";

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
      try {
        const res = await getUserByToken();
        console.log("Get user by token:", res.data);
        if (res?.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            setUser(null);
          }
        }
      }
    };
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
