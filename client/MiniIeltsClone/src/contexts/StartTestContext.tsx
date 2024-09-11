import { createContext, useEffect, useState } from "react";
import { TestTime } from "../pages/DoTestPage/BottomPanel/BottomPanel";
export interface StartTestContextProps {
  startTest: boolean;
  setStartTest: React.Dispatch<React.SetStateAction<boolean>>;
  time: TestTime;
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
  time: initialTime,
}) => {
  const [startTest, setStartTest] = useState<boolean>(false);
  const [time, setTime] = useState<TestTime>(
    initialTime ?? { minute: 0, second: 0 }
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (!startTest) return prev;
        const newTime: TestTime = { ...prev };
        if (prev.second < 59) newTime.second += 1;
        else if (prev.second === 59) {
          prev.second = 0;
          prev.minute += 1;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTest]);
  return (
    <StartTestContext.Provider value={{ setStartTest, startTest, time }}>
      {children}
    </StartTestContext.Provider>
  );
};
