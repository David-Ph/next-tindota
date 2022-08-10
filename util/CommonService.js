import moment from "moment";

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const copyToClipBoard = (text) => {
  navigator.clipboard.writeText(text);
};

export const getDaysFrom = (from) => {
  if (!from) return "Never";

  const a = moment(from);
  const today = moment(new Date());
  return a.diff(today, "days");
};
