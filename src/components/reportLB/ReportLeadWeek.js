import { getNumberBrand, getNumberByDate } from "../../apis/reportNumber.js";
import { getUser } from "../../apis/userList.js";
import { role } from "../../util/const.js";
import BarChart from "../BarChart.js";
import Filter from "../Filter.js";

import ReportTable from "./ReportTable.js";

class ReportLeadWeek {
  labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  dataSet = [
    {
      label: "Lead",
      backgroundColor: "#1a73e8",
      borderColor: "#1a73e8",
      highlightFill: "#1a73e8",
      highlightStroke: "#1a73e8",
      data: []
    },
    {
      label: "Booking",
      backgroundColor: "red",
      borderColor: "red",
      highlightFill: "red",
      highlightStroke: "red",
      data: []
    }
  ];

  constructor() {
    this.user = "";
    this.$container = document.createElement("div");
    this.$container.className = "reportLeadWeek";

    this.$control = document.createElement("div");
    this.$control.className =
      "d-flex justify-content-end my-3 align-items-end mx-3";

    this.$userBox = document.createElement("div");

    this.$box = document.createElement("div");
    this.$box.className = "d-flex gap-3 align-items-start";
    this.$chartBox = document.createElement("div");
    this.$chartBox.style.width = "65%";
    this.$tableBox = document.createElement("div");
    this.$tableBox.style.width = "35%";
  }
  filterSearch = () => {
    this.getDateData();
    this.getBrandData();
  };
  setUser = (val) => {
    this.user = val;
  };
  getAllUser = async () => {
    const fetchUser = await getUser({ userCode: "" });
    this.$userBox.innerHTML = "";
    this.$selectUser = new Filter({
      data: fetchUser.data,
      filterSearch: this.filterSearch,
      setUser: this.setUser,
      title: "Nhân viên"
    });
    this.$userBox.appendChild(this.$selectUser.render());
  };
  getBrandData = async () => {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    const brandData = await getNumberBrand({
      startDate: firstday,
      endDate: lastday,
      user: this.user
    });

    this.$serviceBookingRp = new ReportTable({ data: brandData.data });
    this.$tableBox.innerHTML = "";
    this.$tableBox.appendChild(this.$serviceBookingRp.render());
  };
  getDateData = async () => {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    const weekData = await getNumberByDate({
      startDate: firstday,
      endDate: lastday,
      user: this.user
    });
    this.dataSet[0].data = weekData.lead;
    this.dataSet[1].data = weekData.booking;
    this.$chartBox.innerHTML = "";
    this.$chart = new BarChart({ labels: this.labels, dataSet: this.dataSet });
    this.$chartBox.appendChild(this.$chart.render());
  };
  render() {
    if (role === "admin") {
      this.getAllUser();
    }
    this.$container.appendChild(this.$control);
    this.$container.appendChild(this.$box);
    this.$control.appendChild(this.$userBox);
    this.getBrandData();
    this.getDateData();
    this.$box.appendChild(this.$chartBox);
    this.$box.appendChild(this.$tableBox);

    return this.$container;
  }
}
export default ReportLeadWeek;
