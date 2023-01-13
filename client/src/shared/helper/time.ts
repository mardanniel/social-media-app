export const getTimeAndDate = (ISODateString?: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date(ISODateString ?? Date.now());
  return `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} at ${date.toLocaleTimeString(
    'en-us',
    { hour: 'numeric', hour12: true, minute: 'numeric' }
  )}`;
};
