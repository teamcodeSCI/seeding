import { BASE_URL, role } from "../util/const.js";
import { splitStr } from "../util/splitStr.js";
import { formatDate, getDuplicate, removeAccents } from "../util/util.js";

export const getNumberBrand = async ({ startDate, endDate, userCode }) => {
  try {
    const token = splitStr(localStorage.getItem("token")).token;
    const responseLead = await fetch(
      `${BASE_URL}/get-form?token=${token}&type=seeding&start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(endDate)}&user_seeding=${userCode}`
    );
    const responseBooking = await fetch(
      `${BASE_URL}/get-booking?token=${token}&type=opportunity&start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(endDate)}&user_seeding=${userCode}`
    );
    const dataBooking = await responseBooking.json();
    const dataLead = await responseLead.json();
    let leadKN = 0;
    let leadPR = 0;
    let leadDA = 0;
    let leadHH = 0;
    for (let i = 1; i < dataLead.data.length; i++) {
      if (dataLead.data[i].brand === "KN") {
        leadKN++;
      }
      if (dataLead.data[i].brand === "PR") {
        leadPR++;
      }
      if (dataLead.data[i].brand === "DA") {
        leadDA++;
      }
      if (dataLead.data[i].brand === "HH") {
        leadHH++;
      }
    }

    let bookingKN = 0;
    let bookingPR = 0;
    let bookingDA = 0;
    let bookingHH = 0;
    for (let i = 1; i < dataBooking.data.length; i++) {
      if (dataBooking.data[i].brand === "Kangnam") {
        bookingKN++;
      }
      if (dataBooking.data[i].brand === "Paris") {
        bookingPR++;
      }
      if (dataBooking.data[i].brand === "Đông Á") {
        bookingDA++;
      }
      if (dataBooking.data[i].brand === "Hồng Hà") {
        bookingHH++;
      }
    }

    return {
      message: "Success",
      data: [
        {
          name: "Kangnam",
          lead: leadKN,
          booking: bookingKN
        },
        {
          name: "Paris",
          lead: leadPR,
          booking: bookingPR
        },
        {
          name: "Đông Á",
          lead: leadDA,
          booking: bookingDA
        },
        {
          name: "Hồng Hà",
          lead: leadHH,
          booking: bookingHH
        }
      ]
    };
  } catch (error) {
    return { message: error };
  }
};
export const getNumberByDate = async ({ startDate, endDate }, steps = 1) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const responseLead = await fetch(
    `${BASE_URL}/get-form?token=${token}&type=seeding`
  );
  const dataLead = await responseLead.json();
  const responseBooking = await fetch(
    `${BASE_URL}/get-booking?token=${token}&type=opportunity`
  );
  const dataBooking = await responseBooking.json();

  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
  const dayArr = [];
  const arrLead = [];
  const arrBooking = [];
  dateArray.forEach((item) => {
    dayArr.push(`${new Date(item).getDate()}/${new Date(item).getMonth() + 1}`);
    const dateArrLead = [];
    for (let i = 1; i < dataLead.data.length; i++) {
      if (
        new Date(dataLead.data[i].create_date).toDateString() ===
        new Date(item).toDateString()
      ) {
        dateArrLead.push(dataLead.data[i]);
      }
    }
    arrLead.push(dateArrLead.length);

    const dateArrBooking = [];
    for (let i = 1; i < dataBooking.data.length - 1; i++) {
      if (
        new Date(dataBooking.data[i].create_date).toDateString() ===
        new Date(item).toDateString()
      ) {
        dateArrBooking.push(dataBooking.data[i]);
      }
    }
    arrBooking.push(dateArrBooking.length);
  });
  return { labels: dayArr, lead: arrLead, booking: arrBooking };
};

export const getNumberByYear = async ({ startDate, endDate }, steps = 1) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const responseLead = await fetch(
    `${BASE_URL}/get-form?token=${token}&type=seeding`
  );
  const dataLead = await responseLead.json();
  const responseBooking = await fetch(
    `${BASE_URL}/get-booking?token=${token}&type=opportunity`
  );
  const dataBooking = await responseBooking.json();
  const labelArr = [];
  const dateArray = [];
  let currentDate = new Date(startDate);
  for (
    let i = currentDate.getMonth() + 1;
    i <= new Date(endDate).getMonth() + 1;
    i++
  ) {
    dateArray.push(i);
    labelArr.push("Tháng " + i);
  }

  const arrLead = [];
  const arrBooking = [];
  dateArray.forEach((item) => {
    const dateArrLead = [];
    for (let i = 1; i < dataLead.data.length; i++) {
      if (new Date(dataLead.data[i].create_date).getMonth() + 1 === item) {
        dateArrLead.push(dataLead.data[i]);
      }
    }
    arrLead.push(dateArrLead.length);

    const dateArrBooking = [];
    for (let i = 1; i < dataBooking.data.length - 1; i++) {
      if (new Date(dataBooking.data[i].create_date).getMonth() + 1 === item) {
        dateArrBooking.push(dataBooking.data[i]);
      }
    }
    arrBooking.push(dateArrBooking.length);
  });
  return { labels: labelArr, lead: arrLead, booking: arrBooking };
};
const searchByService = (data, input) => {
  if (input === "") return data;
  return data.filter(
    (item) => removeAccents(item.service).search(removeAccents(input)) !== -1
  );
};
const searchByBrand = (data, input) => {
  if (input === "Tất cả" || input === "Thương hiệu") return data;
  return data.filter(
    (item) => removeAccents(item.brand).search(removeAccents(input)) !== -1
  );
};

export const getCustomerSuccess = async ({ search, filter }) => {
  try {
    const response = await fetch("src/apis/customerSuccess.json");
    const data = await response.json();
    const searchData = searchByService(data, search);
    const filterData = searchByBrand(data, filter);
    const renderData = getDuplicate(searchData, filterData);

    return {
      message: "Success",
      data: renderData.sort((a, b) => b.number - a.number)
    };
  } catch (error) {
    return { message: error };
  }
};
