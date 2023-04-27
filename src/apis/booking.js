import { BASE_URL } from "../util/const.js";
import { splitStr } from "../util/splitStr.js";

export const getBooking = async ({
  pageNum,
  startDate,
  endDate,
  name,
  phone,
  code,
  user,
  type
}) => {
  try {
    const token = splitStr(localStorage.getItem("token")).token;
    const paginationLimit = 15;
    // Call API
    const response = await fetch(
      `${BASE_URL}/get-booking?token=${token}&limit=${paginationLimit}&type=${type}&offset=${
        pageNum > 0
          ? (pageNum - 1) * paginationLimit
          : pageNum * paginationLimit
      }&start_date=${startDate}&end_date=${endDate}&name=${name}&phone=${phone}&code=${code}&user_seeding=${user}`
    );
    const data = await response.json();

    if (!data) {
      return { message: data.message };
    }
    const count = data.data[0].count_no_limit;
    const renderData = [];
    for (let i = 1; i < data.data.length - 1; i++) {
      renderData.push(data.data[i]);
    }

    const pageCount = Math.ceil(count / paginationLimit);
    return {
      message: data.message,
      render: renderData,
      pageCount: pageCount
    };
  } catch (e) {
    return { message: e };
  }
};
