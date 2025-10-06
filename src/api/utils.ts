export const randomDelayRequest = () => {
  const ms = Math.floor(Math.random() * 1000);
  return new Promise((resolve) => setTimeout(resolve, ms));
};
