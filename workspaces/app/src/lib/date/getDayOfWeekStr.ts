const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export const getDayOfWeekStr = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayStr = days.at(dayOfWeek);
  if (dayStr == null) {
    throw new Error('dayOfWeek is invalid');
  }
  return dayStr;
};
