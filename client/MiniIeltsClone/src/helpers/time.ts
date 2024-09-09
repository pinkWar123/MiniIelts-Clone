export const convertSecondsToMinuteAndSecond = (seconds: number) => {
  const second = seconds % 60;
  let minute = Math.floor(seconds / 60);
  if (minute < 60)
    return `${minute.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`;
  const hour = Math.floor(minute / 60);
  minute %= 60;
  return `${hour
    .toString()
    .padStart(2, "0")}:{minute.toString().padStart(2, '0')}:${second
    .toString()
    .padStart(2, "0")}`;
};
