const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// [0, 11]
const getMonthName = (index) => {
  return months[index];
};

export const getDateString = (date) => {
  return `${getMonthName(
    date.getMonth()
  )} ${date.getDate()}, ${date.getFullYear()}`;
};
