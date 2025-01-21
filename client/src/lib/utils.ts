

export const parseDate = (date: Date | null) => {
  if (!date) return "";
  const createdDate = new Date(date);

  return String(createdDate.toDateString());
};