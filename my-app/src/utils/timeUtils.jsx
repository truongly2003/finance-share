import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const formatTime = (time = null) => {
  if (!time) {
    return dayjs().format("HH:mm, DD/MM/YYYY");
  }

  const inputTime = dayjs(time);
  const now = dayjs();
  const daysDifference = now.diff(inputTime, "day");

  if (daysDifference > 1) {
    return inputTime.format("HH:mm, DD/MM/YYYY");
  }
  return inputTime.fromNow();
};
