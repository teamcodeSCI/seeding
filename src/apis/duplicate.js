import { splitStr } from "../util/splitStr.js";

export const duplicate = async ({ startDate, endDate, userSeeding, phone }) => {
  userSeeding = "";
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(`
    https://scigroup.com.vn/cp/seeding/api/get-check-seeding?
    token=${token}&start_date=${startDate}&end_date=${endDate}&phone=${phone}&user_seeding=${userSeeding}
`);
  const data = await response.json();
  return data;
};
