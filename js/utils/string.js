export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

export const formatUsd = (number) => {
  return `$ ${number.toLocaleString("en-US")}`;
};
