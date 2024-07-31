// src/hooks/useUser.ts
import { useContext } from "react";
import { UserContext, UserContextProps } from "../contexts/UserContext";

const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
