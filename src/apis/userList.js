import { BASE_URL } from "../util/const.js";
import { splitStr } from "../util/splitStr.js";
import { removeAccents } from "../util/util.js";

export const getUser = async ({ userCode }) => {
  try {
    const token = splitStr(localStorage.getItem("token")).token;
    const response = await fetch(
      `${BASE_URL}/get-user?token=${token}&code_user=${userCode}`
    );
    const data = await response.json();

    return {
      message: "Success",
      data: data.data
    };
  } catch (e) {
    console.log(e);
    return;
  }
};
const searchUser = (data, input) => {
  if (input === "") return data;
  return data.filter(
    (item) => removeAccents(item.name).search(removeAccents(input)) !== -1
  );
};
export const suggestUser = async (input) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(`${BASE_URL}/get-user?token=${token}`);
  const data = await response.json();
  const newData = searchUser(data.data, input);
  if (!data) {
    console.log("data not found");
    return;
  }
  return input === "" ? data.data : newData;
};

export const createUser = async ({ name, phone, mobile, birth }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(
    `${BASE_URL}/create-user?token=${token}&name=${name}&phone=${phone}&mobile=${mobile}&date_of_birth=${birth}`
  );
  const data = await response.json();
  return {
    type: data.result.message.type,
    message: data.result.message.content
  };
};
export const updatePassUser = async ({ user, password }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(
    `${BASE_URL}/update-password-member?token=${token}&login=${user}&password=${password}`
  );
  const data = await response.json();
  return {
    type: data.result.message.type,
    message: data.result.message.content
  };
};
export const activeUser = async ({ codeUser, active }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(
    `${BASE_URL}/update-active-user?token=${token}&code_user=${codeUser}&active=${active}`
  );
  const data = await response.json();
  return data;
};
