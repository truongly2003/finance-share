import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";

dayjs.extend(relativeTime);
dayjs.locale("en");

export const formatTime = (time = null) => {
  if (!time) {
    return dayjs().format("h:mm A, MMMM D, YYYY"); 
  }

  const inputTime = dayjs(time);
  const now = dayjs();
  const daysDifference = now.diff(inputTime, "day");

  if (daysDifference > 1) {
    return inputTime.format("h:mm A, MMMM D, YYYY"); 
  }
  return inputTime.fromNow();
};