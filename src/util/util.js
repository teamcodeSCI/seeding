export const removeAccents = (str) => {
  const string = str || "";
  return string
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const removeDuplicates = (array) => {
  return array.filter((item, index) => array.indexOf(item) === index);
};
export const formatDate = (date) => {
  if (date) {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`;
  }
  return "";
};
export const formatDateTime = (date, isShowTime) => {
  if (date) {
    const newDate = new Date(date);
    const showTime = false || isShowTime;
    return showTime
      ? `${newDate.getDate()}/${
          newDate.getMonth() + 1
        }/${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
      : `${newDate.getDate()}/${
          newDate.getMonth() + 1
        }/${newDate.getFullYear()}`;
  }
  return "";
};
export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};
export const arrToStr = (arr) => {
  if (arr) return arr.toString().split(",");
};
export const random = () => {
  return Math.floor(Math.random() * 100);
};

export const getDuplicate = (arr1, arr2) => {
  return arr1.filter((item) => arr2.indexOf(item) > -1);
};
export const formatMoney = (number) => {
  if (typeof number == "number") {
    if (number / 1000000 < 1000 && number !== 0) {
      return `${Math.floor(number / 1000000)} tr`;
    } else if (number / 1000000000 < 1000 && number !== 0) {
      return `${Math.floor(number / 1000000000)} tỷ`;
    } else {
      return number;
    }
  }
  return number;
};
