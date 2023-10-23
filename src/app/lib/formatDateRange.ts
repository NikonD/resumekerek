export function formatDateRange(start_date: string, end_date: string) {
  let result = "";

  if (start_date && end_date) {
    result = `с ${start_date} по ${end_date}`;
  } else if (start_date) {
    result = `с ${start_date}`;
  } else if (end_date) {
    result = `до ${end_date}`;
  }

  return result;
}