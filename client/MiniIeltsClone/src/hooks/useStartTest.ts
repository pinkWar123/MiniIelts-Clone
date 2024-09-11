import { useContext } from "react";
import {
  StartTestContext,
  StartTestContextProps,
} from "../contexts/StartTestContext";

const useStartTest = (): StartTestContextProps => {
  const context = useContext(StartTestContext);
  if (!context) {
    throw new Error("useStartTest must be used within a StartTestProvider");
  }
  return context;
};

export default useStartTest;
