import { BASE_URL } from "../util/const.js";
import { splitStr } from "../util/splitStr.js";

export const addNewTarget = async ({ kpiDate, kpiTarget, userCode }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(`
        ${BASE_URL}/create-target?token=${token}&kpi_date=${kpiDate}&kpi_target=${kpiTarget}&user_seeding=${userCode}
    `);
  const data = await response.json();
  return {
    error: data.error,
    message: data.result.message.content,
    status: data.result.status
  };
};
const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const fetchTarget = async () => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(`${BASE_URL}/get-target?token=${token}`);
  const data = await response.json();

  const newData = [];
  for (let i = 1; i < data.data.length; i++) {
    newData.push(data.data[i]);
  }
  const groupByDate = groupBy("user");

  const groupDate = Object.entries(groupByDate(newData));
  const monthGroup = [];
  const today = new Date();
  for (let i = 1; i < 13; i++) {
    monthGroup.push(new Date(`${today.getFullYear()}-${i}-01`).getMonth() + 1);
  }
  const render = [];
  const target = [];
  groupDate.forEach((item) => {
    const sortData = item[1].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const dataArr = [item[0]];
    for (let i = 0; i < monthGroup.length; i++) {
      if (sortData[i] === undefined) {
        dataArr.push(0);
      } else {
        dataArr.push(sortData[i].target);
      }
    }
    render.push(dataArr);
  });

  return render;
};
