import { removeAccents } from "../util/util.js";

const url = "https://scigroup.com.vn/cp/seeding/api";
const searchByNameFb = (input, data) => {
  const dataArr = [];
  const getInput = removeAccents(input);
  const nameDatas = [];
  for (let item of data) {
    nameDatas.push(removeAccents(item.name));
  }
  for (let i = 0; i < nameDatas.length; i++) {
    if (nameDatas[i].search(getInput) !== -1) {
      if (nameDatas[i] === removeAccents(data[i].name)) {
        dataArr.push(data[i]);
      }
    }
  }
  return dataArr;
};
export const getBrand = async ({ token, input }) => {
  try {
    const response = await fetch(`${url}/get-company?token=${token}`);
    const data = await response.json();
    const newData = searchByNameFb(input, data.data);
    if (!data) {
      console.log("data not found");
      return;
    }
    return input === "" ? data.data : newData;
  } catch (e) {
    console.log(e);
    return e;
  }
};
