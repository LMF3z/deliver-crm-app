export const showDateWithTimezone = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    calendar: 'gregory',
    numberingSystem: 'latn',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'Atlantic/Canary',
  }).format(new Date(date));
};
