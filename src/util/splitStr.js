export const splitStr = (str) => {
  const text = str.split("/");
  return { token: text[0], username: text[1], rule: text[2] };
};
