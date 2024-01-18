export const dateFormatter = (dateInput) => {
  const inputDate = new Date(dateInput);
  const options = { day: "numeric", month: "short", year: "numeric" };
  const dateFormatter = new Intl.DateTimeFormat("en-GB", options);
  const formattedDate = dateFormatter.format(inputDate);
  return formattedDate
};
