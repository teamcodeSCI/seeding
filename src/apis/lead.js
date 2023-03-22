import { BASE_URL } from "../util/const.js";
import { splitStr } from "../util/splitStr.js";

export const getLead = async ({
  pageNum,
  name,
  phone,
  service,
  fb,
  branch,
  startDate,
  endDate,
  user
}) => {
  try {
    const token = splitStr(localStorage.getItem("token")).token;
    const paginationLimit = 15;
    // Call API
    const response = await fetch(
      `${BASE_URL}/get-form?token=${token}&brand_id=${""}&type=seeding&limit=${paginationLimit}&offset=${
        pageNum > 0
          ? (pageNum - 1) * paginationLimit
          : pageNum * paginationLimit
      }&company_id=${branch}&name_fb=${fb}&phone=${phone}&service=${service}&name=${name}&start_date=${startDate}&end_date=${endDate}&user_seeding=${user}`
    );
    const data = await response.json();

    if (!data.data) {
      return { message: data.message };
    }
    const count = data.data[0].count_no_limit;
    const renderData = [];
    for (let i = 1; i < data.data.length; i++) {
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
export const createLead = async ({
  name,
  phone,
  nameFb,
  linkFb,
  service,
  branch,
  script,
  note,
  interactive
}) => {
  try {
    const token = splitStr(localStorage.getItem("token")).token;
    const response = await fetch(
      `${BASE_URL}/create-form?token=${token}&name=${name}&phone=${phone}&link_fb=${linkFb}&name_fb=${nameFb}&service=${service}&note=${note}&script=${script}&interactive_proof=${interactive}&company_id=${branch}&type=seeding`
    );
    const data = await response.json();
    console.log("data: ", data);
  } catch (e) {
    console.log(e);
    return {
      message: e
    };
  }
};
export const updateLead = async ({
  codeForm,
  userId,
  name,
  phone,
  nameFb,
  linkFb,
  service,
  branch,
  script,
  note,
  interactive
}) => {
  try {
    const token = splitStr(localStorage.getItem("token")).token;
    const response = await fetch(
      `${BASE_URL}/update-form?token=${token}&code_form=${codeForm}&name=${name}&phone=${phone}&link_fb=${linkFb}&name_fb=${nameFb}&service=${service}&note=${note}&script=${script}&interactive_proof=${interactive}&company_id=${branch}&type=seeding&seeding_user_id=${userId}&ctv_user_id=false&brand=${""}`
    );
    const data = await response.json();
    console.log(data.result.message);
    return {
      type: data.result.message.type,
      message: data.result.message.content
    };
  } catch (e) {
    console.log(e);
    return {
      message: e
    };
  }
};
