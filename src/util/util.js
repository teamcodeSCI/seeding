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
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    }
    return ''
};
export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};
export const arrToStr = (arr) => {
    return arr.toString().split(',')
}
export const random = () => {
    return Math.floor(Math.random() * 100);
}

export const getDuplicate = (arr1, arr2) => {
    return arr1.filter((item) => arr2.indexOf(item) > -1)
}