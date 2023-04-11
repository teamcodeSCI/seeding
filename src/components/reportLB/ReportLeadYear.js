import { getNumberBrand, getNumberByYear } from "../../apis/reportNumber.js";
import { getUser } from "../../apis/userList.js";
import { role } from "../../util/const.js";

import BarChart from "../BarChart.js";
import Filter from "../Filter.js";

import ReportTable from "./ReportTable.js";

class ReportLeadYear {
  labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ];

  dataSet = [
    {
      label: "Lead",
      backgroundColor: "#1a73e8",
      borderColor: "#1a73e8",
      highlightFill: "#1a73e8",
      highlightStroke: "#1a73e8",
      data: [10, 20, 30, 40, 50, 56, 80, 10, 20, 30, 40, 25]
    },
    {
      label: "Booking",
      backgroundColor: "red",
      borderColor: "red",
      highlightFill: "red",
      highlightStroke: "red",
      data: [5, 18, 25, 30, 35, 50, 70, 5, 18, 16, 39, 10]
    }
  ];

  constructor() {
    this.user = "";
    this.$container = document.createElement("div");
    this.$container.className = "reportLeadYear";

    this.$control = document.createElement("div");
    this.$control.className =
      "d-flex justify-content-end my-3 align-items-end mx-3";

    this.$userBox = document.createElement("div");

    this.$box = document.createElement("div");
    this.$box.className = "d-flex gap-3 align-items-start";
    this.$chartBox = document.createElement("div");
    this.$chartBox.style.width = "70%";
    this.$tableBox = document.createElement("div");
    this.$tableBox.style.width = "30%";
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
    const date = new Date();
    const year = date.getFullYear();
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);

    const brandData = await getNumberBrand({
      startDate: firstDay,
      endDate: lastDay,
      userCode: this.user
    });
    this.$serviceBookingRp = new ReportTable({ data: brandData.data });
    this.$tableBox.innerHTML = "";
    this.$tableBox.appendChild(this.$serviceBookingRp.render());
  };
  getDateData = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);
    const weekData = await getNumberByYear({
      startDate: firstDay,
      endDate: lastDay,
      userCode: this.user
    });

    this.labels = weekData.labels;
    this.dataSet[0].data = weekData.lead;
    this.dataSet[1].data = weekData.booking;
    this.$chartBox.innerHTML = "";
    this.$chart = new BarChart({
      labels: this.labels,
      dataSet: this.dataSet
    });
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
export default ReportLeadYear;
