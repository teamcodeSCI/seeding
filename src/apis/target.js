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

export const fetchTarget = async (user) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(
    `${BASE_URL}/get-target?token=${token}&user_seeding=${user}`
  );
  const data = await response.json();

  return {
    data: data.data.sort((a, b) => new Date(a.date) - new Date(b.date)),
    error: data.error,
    message: data.message
  };
};
export const updateTarget = async ({ target, id, date, codeUser }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(
    `${BASE_URL}/update-target?token=${token}&id=${id}&kpi_date=${date}&kpi_target=${target}&user_seeding=${codeUser}`
  );
  const data = await response.json();
  return {
    error: data.error,
    message: data.result.message.content,
    status: data.result.status
  };
};
