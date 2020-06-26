export const capitalLetter = (str) => {
  console.log(str);
  str = str.trim().split(" ");

  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
};
