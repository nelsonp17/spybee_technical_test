import { format } from "date-fns";
import { es } from "date-fns/locale";

// const dateStr = "2024-10-08T05:13:21.398Z";
// const result = format(new Date(dateStr), "dd MMM yyyy", { locale: es });

// console.log(result); // "08 oct 2024"

export const formatDate = (
  dateString: string,
  formatString: string = "dd MMM yyyy",
): string => {
  const date = new Date(dateString);

  const formattedDate = format(date, formatString, { locale: es });

  return formattedDate;
};
