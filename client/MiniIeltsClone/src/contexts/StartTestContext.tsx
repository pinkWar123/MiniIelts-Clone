import { createContext, useEffect, useState } from "react";
import { TestTime } from "../pages/DoTestPage/BottomPanel/BottomPanel";
export interface StartTestContextProps {
  startTest: boolean;
  setStartTest: React.Dispatch<React.SetStateAction<boolean>>;
  startTime: Date | null;
}
export const StartTestContext = createContext<
  StartTestContextProps | undefined
>(undefined);

interface StartTestProviderProps {
  children: React.ReactNode;
  time?: TestTime;
}

export const StartTestProvider: React.FC<StartTestProviderProps> = ({
  children,
}) => {
  const [startTest, setStartTest] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  useEffect(() => {
    if (startTest) {
      const start = new Date();
      setStartTime(start);
      console.log("Start Time:", start.getTime()); // Log start time
    }
  }, [startTest]);
  return (
    <StartTestContext.Provider value={{ setStartTest, startTest, startTime }}>
      {children}
    </StartTestContext.Provider>
  );
};
