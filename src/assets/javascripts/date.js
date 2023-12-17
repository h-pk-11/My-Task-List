import { format } from "date-fns";

export default function formatDate(date, form) {
  return format(date, form);
}
