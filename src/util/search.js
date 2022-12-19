import { removeAccents } from "./util.js";

export const searchByName = (input, data) => {
    const dataArr = [];
    const getInput = removeAccents(input)
    const nameDatas = [];
    for (let item of data) {
        nameDatas.push(removeAccents(item.name))
    }
    for (let i = 0; i < nameDatas.length; i++) {
        if (nameDatas[i].search(getInput) !== -1) {
            if (nameDatas[i] === removeAccents(data[i].name)) {
                dataArr.push(data[i])
            }
        }
    }
    return dataArr
}
export const searchByService = (input, data) => {
    const dataArr = [];
    const getInput = removeAccents(input)
    const nameDatas = [];
    for (let item of data) {
        nameDatas.push(removeAccents(item.service))
    }
    for (let i = 0; i < nameDatas.length; i++) {
        if (nameDatas[i].search(getInput) !== -1) {
            if (nameDatas[i] === removeAccents(data[i].service)) {
                dataArr.push(data[i])
            }
        }
    }
    return dataArr
}
export const searchByBranch = (input, data) => {
    const dataArr = [];
    const getInput = removeAccents(input)
    const nameDatas = [];
    for (let item of data) {
        nameDatas.push(removeAccents(item.branch))
    }
    for (let i = 0; i < nameDatas.length; i++) {
        if (nameDatas[i].search(getInput) !== -1) {
            if (nameDatas[i] === removeAccents(data[i].branch)) {
                dataArr.push(data[i])
            }
        }
    }
    return dataArr
}
export const searchByPhone = (input, data) => {
    const dataArr = [];
    const getInput = removeAccents(input)
    const nameDatas = [];
    for (let item of data) {
        nameDatas.push(removeAccents(item.phonenumber))
    }
    for (let i = 0; i < nameDatas.length; i++) {
        if (nameDatas[i].search(getInput) !== -1) {
            if (nameDatas[i] === removeAccents(data[i].phonenumber)) {
                dataArr.push(data[i])
            }
        }
    }
    return dataArr
}
export const searchByNameFb = (input, data) => {
    const dataArr = [];
    const getInput = removeAccents(input)
    const nameDatas = [];
    for (let item of data) {
        nameDatas.push(removeAccents(item.nameFb))
    }
    for (let i = 0; i < nameDatas.length; i++) {
        if (nameDatas[i].search(getInput) !== -1) {
            if (nameDatas[i] === removeAccents(data[i].nameFb)) {
                dataArr.push(data[i])
            }
        }
    }
    return dataArr
}