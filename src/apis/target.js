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
  const groupByDate = groupBy("date");
  const groupDate = Object.entries(groupByDate(newData));
  const groupByName = groupBy("user");
  const groupName = Object.entries(groupByName(newData));

  const user = [""];
  groupName.sort().forEach((item) => {
    user.push(item[0]);
  });
  const render = [];

  groupDate.forEach((item) => {
    const dataArr = [item[0]];
    item[1].sort((a, b) => ("" + a.user).localeCompare(b.user));
    for (let i = 0; i < groupName.length; i++) {
      if (item[1][i] === undefined) {
        dataArr.push(0);
      } else {
        dataArr.push(item[1][i]);
      }
    }
    render.push(dataArr);
  });
  return { data: render, user: user.sort() };
};
