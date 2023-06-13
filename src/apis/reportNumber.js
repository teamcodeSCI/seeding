import { BASE_URL, groupService, role, seedingCode } from "../util/const.js";
import { splitStr } from "../util/splitStr.js";
import { formatDate, removeAccents } from "../util/util.js";

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
export const getNumberByDate = async (
  { startDate, endDate, userCode },
  steps = 1
) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const responseLead = await fetch(
    `${BASE_URL}/get-form?token=${token}&type=seeding&user_seeding=${userCode}`
  );
  const dataLead = await responseLead.json();
  const responseBooking = await fetch(
    `${BASE_URL}/get-booking?token=${token}&type=opportunity&user_seeding=${userCode}`
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

export const getNumberByYear = async ({ startDate, endDate, userCode }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const responseLead = await fetch(
    `${BASE_URL}/get-form?token=${token}&type=seeding&user_seeding=${userCode}`
  );
  const dataLead = await responseLead.json();
  const responseBooking = await fetch(
    `${BASE_URL}/get-booking?token=${token}&type=opportunity&user_seeding=${userCode}`
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

const searchByName = (data, input) => {
  return input === ""
    ? data
    : data.filter(
        (item) =>
          removeAccents(item.group_service).search(removeAccents(input)) !== -1
      );
};
export const getCustomerSuccess = async ({
  search,
  filter,
  startDate,
  endDate,
  user
}) => {
  try {
    const token = splitStr(localStorage.getItem("token")).token;
    const response =
      await fetch(`https://scigroup.com.vn/cp/seeding/api/get-report?
    token=${token}&
    brand_id=${filter}&
    group_service=${groupService}&
    limit=&
    offset=&
    start_date=${formatDate(startDate)}&
    end_date=${formatDate(endDate)}&
    user_seeding=${role === "user" ? seedingCode : user}`);
    const data = await response.json();
    data.data.pop();
    const renderData = searchByName(data.data, search);

    return {
      error: data.error,
      message: data.message,
      tong_tien: renderData.sort(
        (a, b) => Number(b.tong_tien) - Number(a.tong_tien)
      ),
      so_luong: renderData.sort((a, b) => b.so_luong - a.so_luong)
    };
  } catch (error) {
    return { message: error };
  }
};
export const getSuccessByBrand = async ({ startDate, endDate, userCode }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response =
    await fetch(`https://scigroup.com.vn/cp/seeding/api/get-report-booking?
token=${token}&
start_date=${formatDate(startDate)}&
end_date=${formatDate(endDate)}&
user_seeding=${role === "user" ? seedingCode : userCode}`);
  const data = await response.json();
  data.data.pop();

  const all = [];
  const kn = [];
  const pr = [];
  const da = [];
  const hh = [];
  const date = [];
  for (let i = 0; i < data.data.length; i++) {
    all.push(data.data[i].sl_ngay);
    kn.push(data.data[i].kn);
    pr.push(data.data[i].pr);
    da.push(data.data[i].da);
    hh.push(data.data[i].hh);
    date.push(
      `${new Date(data.data[i].date).getDate()}/${
        new Date(data.data[i].date).getMonth() + 1
      }`
    );
  }
  return {
    data: {
      all,
      kn,
      pr,
      da,
      hh,
      date
    }
  };
};
export const getSuccessBrandYear = async ({ startDate, endDate, userCode }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response =
    await fetch(`https://scigroup.com.vn/cp/seeding/api/get-report-booking?
token=${token}&
start_date=${formatDate(startDate)}&
end_date=${formatDate(endDate)}&
user_seeding=${role === "user" ? seedingCode : userCode}`);
  const data = await response.json();

  data.data.pop();
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
  const arrAll = [];
  const arrDA = [];
  const arrHH = [];
  const arrKN = [];
  const arrPR = [];
  dateArray.forEach((item) => {
    let all = 0;
    let da = 0;
    let hh = 0;
    let kn = 0;
    let pr = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (new Date(data.data[i].date).getMonth() + 1 === item) {
        all += data.data[i].sl_ngay;
        da += data.data[i].da;
        hh += data.data[i].hh;
        kn += data.data[i].kn;
        pr += data.data[i].pr;
      }
    }
    arrAll.push(all);
    arrDA.push(da);
    arrHH.push(hh);
    arrKN.push(kn);
    arrPR.push(pr);
  });

  return {
    data: {
      labels: labelArr,
      all: arrAll,
      da: arrDA,
      hh: arrHH,
      kn: arrKN,
      pr: arrPR
    }
  };
};
export const getRevenue = async ({ startDate, endDate, user }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(`
    https://scigroup.com.vn/cp/seeding/api/get-report-brand?
    token=${token}&start_date=${formatDate(startDate)}&end_date=${formatDate(
    endDate
  )}&user_seeding=${role === "user" ? seedingCode : user}`);
  const data = await response.json();
  data.data.pop();
  const all = [];
  const kn = [];
  const pr = [];
  const da = [];
  const hh = [];
  const date = [];
  for (let i = 0; i < data.data.length; i++) {
    all.push(data.data[i].tong_tien_all_day);
    kn.push(data.data[i].tong_tien_KN);
    pr.push(data.data[i].tong_tien_PR);
    da.push(data.data[i].tong_tien_DA);
    hh.push(data.data[i].tong_tien_HN);
    date.push(
      `${new Date(data.data[i].date).getDate()}/${
        new Date(data.data[i].date).getMonth() + 1
      }`
    );
  }
  return {
    data: {
      all,
      kn,
      pr,
      da,
      hh,
      date
    }
  };
};
export const getRevenueByYear = async ({ startDate, endDate, user }) => {
  const token = splitStr(localStorage.getItem("token")).token;
  const response = await fetch(`
    https://scigroup.com.vn/cp/seeding/api/get-report-brand?
    token=${token}&start_date=${formatDate(startDate)}&end_date=${formatDate(
    endDate
  )}&user_seeding=${role === "user" ? seedingCode : user}`);
  const data = await response.json();
  data.data.pop();

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
  const arrAll = [];
  const arrDA = [];
  const arrHH = [];
  const arrKN = [];
  const arrPR = [];
  dateArray.forEach((item) => {
    let all = 0;
    let da = 0;
    let hh = 0;
    let kn = 0;
    let pr = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (new Date(data.data[i].date).getMonth() + 1 === item) {
        all += data.data[i].tong_tien_all_day;
        da += data.data[i].tong_tien_DA;
        hh += data.data[i].tong_tien_HN;
        kn += data.data[i].tong_tien_KN;
        pr += data.data[i].tong_tien_PR;
      }
    }
    arrAll.push(all);
    arrDA.push(da);
    arrHH.push(hh);
    arrKN.push(kn);
    arrPR.push(pr);
  });

  return {
    data: {
      labels: labelArr,
      all: arrAll,
      da: arrDA,
      hh: arrHH,
      kn: arrKN,
      pr: arrPR
    }
  };
};
