import moment from "moment";
import NProgress from "nprogress";

export const callApi = async (url = "", method = "GET", body = {}) => {
  NProgress.start();
  const response = await fetch(url, {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  NProgress.done();

  return response;
};

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
  return today.diff(a, "days");
};

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
