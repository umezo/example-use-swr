export const sleep = (duration: number = 100): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
