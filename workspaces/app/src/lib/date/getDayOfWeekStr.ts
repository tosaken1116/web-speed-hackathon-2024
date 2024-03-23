const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export const getDayOfWeekStr = (date: Date) => {
  const day = date.getDay();
  const dayStr = days[day];
  if (dayStr == null) {
    throw new Error(`Invalid day: ${day}`);
  }
  return dayStr;
};
