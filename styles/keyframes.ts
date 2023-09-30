import { KeyValuePair } from "tailwindcss/types/config";

export const shrinkAnimation = (): KeyValuePair<
  string,
  KeyValuePair<string, string>
> => {
  let result: KeyValuePair<string, KeyValuePair<string, string>> = {};
  for (let i = 0; i < 20; i++) {
    result[`${i}%`] = {
      opacity: `${1 / i}`,
      transform: `translateX(${i * 70}px)`,
    };
  }
  return result;
};

export const anvilAnimation = (): KeyValuePair<
  string,
  KeyValuePair<string, string>
> => {
  let result: KeyValuePair<string, KeyValuePair<string, string>> = {};
  result["0%"] = {
    transform: `scale(1) translateY(0px)`,
    opacity: `0`,
    "box-shadow": `0 0 0 rgba(241, 241, 241, 0)`,
  };
  result["1%"] = {
    transform: `scale(0.96) translateY(10px)`,
    opacity: `0`,
    "box-shadow": `0 0 0 rgba(241, 241, 241, 0)`,
  };
  result["100%"] = {
    transform: `scale(1) translateY(0px)`,
    opacity: `1`,
    "box-shadow": `0 0 500px rgba(241, 241, 241, 0)`,
  };
  return result;
};
