import { getNumberBrand, getNumberByDate } from "../../apis/reportNumber.js";
import { getUser } from "../../apis/userList.js";
import { role } from "../../util/const.js";

import BarChart from "../BarChart.js";
import Filter from "../Filter.js";

import ReportTable from "./ReportTable.js";

class ReportLeadMonth {
  dataSet = [
    {
      label: "Lead",
      backgroundColor: "#1a73e8",
      borderColor: "#1a73e8",
      highlightFill: "#1a73e8",
      highlightStroke: "#1a73e8",
      data: [10, 20, 30, 40]
    },
    {
      label: "Booking",
      backgroundColor: "red",
      borderColor: "red",
      highlightFill: "red",
      highlightStroke: "red",
      data: [5, 15, 20, 30]
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
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

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
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weekData = await getNumberByDate({
      startDate: firstDay,
      endDate: lastDay,
      user: this.user
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
export default ReportLeadMonth;
