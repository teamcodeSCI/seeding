import { getNumberBrand } from "../../apis/reportNumber.js";
import { app } from "../../util/const.js";

import BarChart from "../BarChart.js";

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
    this.$box = document.createElement("div");
    this.$box.className = "d-flex gap-3 align-items-start";
    this.$chartBox = document.createElement("div");
    this.$chartBox.style.width = "65%";
    this.$tableBox = document.createElement("div");
    this.$tableBox.style.width = "35%";

    this.$chart = new BarChart({ labels: this.labels, dataSet: this.dataSet });
  }
  getBrandData = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);

    const brandData = await getNumberBrand({
      startDate: firstDay,
      endDate: lastDay
    });
    this.$serviceBookingRp = new ReportTable({ data: brandData.data });
    this.$tableBox.innerHTML = "";
    this.$tableBox.appendChild(this.$serviceBookingRp.render());
  };
  render() {
    this.$box.appendChild(this.$chartBox);
    this.$chartBox.appendChild(this.$chart.render());
    this.$box.appendChild(this.$tableBox);
    this.getBrandData();

    return this.$box;
  }
}
export default ReportLeadYear;
