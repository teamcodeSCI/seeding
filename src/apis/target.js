import { BASE_URL } from "../util/const.js";
import { splitStr } from "../util/splitStr.js";

export const addNewTarget = async ({ kpiDate, kpiTarget, userCode }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(`
        ${BASE_URL}/create-target?token=${token}&kpi_date=${kpiDate}&kpi_target=${kpiTarget}&user_seeding=${userCode}
    `);
  const data = await response.json();
  return data.data;
};
