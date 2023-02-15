import Loading from "../components/Loading.js";
import { app } from "./const.js";

const load = new Loading();

export const loading = (isLoading) => {
    isLoading ? app.appendChild(load.render()) : app.removeChild(load.render());
};
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
        return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    }
    return ''
};
export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};