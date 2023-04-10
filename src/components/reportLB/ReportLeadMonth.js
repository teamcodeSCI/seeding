import { getNumberBrand, getNumberByDate } from "../../apis/reportNumber.js";

import BarChart from "../BarChart.js";

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
    this.$box = document.createElement("div");
    this.$box.className = "d-flex gap-3 align-items-start";
    this.$chartBox = document.createElement("div");
    this.$chartBox.style.width = "70%";
    this.$tableBox = document.createElement("div");
    this.$tableBox.style.width = "30%";
  }
  getBrandData = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const brandData = await getNumberBrand({
      startDate: firstDay,
      endDate: lastDay
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
      endDate: lastDay
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
    this.$box.appendChild(this.$chartBox);
    this.$box.appendChild(this.$tableBox);
    this.getDateData();
    this.getBrandData();
    return this.$box;
  }
}
export default ReportLeadMonth;
