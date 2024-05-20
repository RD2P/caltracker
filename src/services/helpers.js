import { format } from "date-fns";

export const formattedDate = () => {
  const date = new Date();
  return format(date, "MMMM do, yyyy");
};

