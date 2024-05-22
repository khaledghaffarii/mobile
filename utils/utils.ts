export const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};
export const generateUniqueId = (): string => {
  return `${new Date().getTime()}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;
};
export const generateCustomKey = () => {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomValue}`;
};
