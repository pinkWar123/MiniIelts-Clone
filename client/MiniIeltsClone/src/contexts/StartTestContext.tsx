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
    // const interval = setInterval(() => {
    //   setTime((prev) => {
    //     if (!startTest) return prev;
    //     const newTime: TestTime = { ...prev };
    //     if (prev.second < 59) newTime.second += 1;
    //     else if (prev.second === 59) {
    //       prev.second = 0;
    //       prev.minute += 1;
    //     }
    //     return newTime;
    //   });
    // }, 1000);

    // return () => clearInterval(interval);

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
