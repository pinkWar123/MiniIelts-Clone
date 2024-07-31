// src/hooks/useUser.ts
import { useContext } from "react";
import { TestContext, TestContextProps } from "../contexts/TestContext";

const useTest = (): TestContextProps => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useUser must be used within a TestProvider");
  }
  return context;
};

export default useTest;
