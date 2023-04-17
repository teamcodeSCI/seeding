import { getNumberBrand, getNumberByDate } from "../../apis/reportNumber.js";
import { getUser } from "../../apis/userList.js";
import { role } from "../../util/const.js";
import BarChart from "../BarChart.js";
import Filter from "../Filter.js";
import InputGroup from "../InputGroup.js";

import ReportTable from "./ReportTable.js";

class ReportLeadRange {
  today = new Date();
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
    this.$container.className = "reportLeadRange";

    this.$control = document.createElement("div");
    this.$control.className =
      "d-flex justify-content-between my-3 align-items-end mx-1";

    this.$userBox = document.createElement("div");

    this.$inputGroup = document.createElement("div");
    this.$inputGroup.className = "d-flex gap-2 align-items-end";

    this.$startDate = new InputGroup({
      title: "Ngày bắt đầu",
      type: "date",
      width: "100%",
      value: this.today
    });

    this.$endDate = new InputGroup({
      title: "Ngày kết thúc",
      type: "date",
      width: "100%",
      value: this.today
    });

    this.$submitBtn = document.createElement("button");
    this.$submitBtn.className = "btn btn-primary py-1 px-2";
    this.$submitBtn.style.fontSize = "14px";
    this.$submitBtn.addEventListener("click", () => {
      this.filterSearch();
    });

    this.$searchIcon = document.createElement("i");
    this.$searchIcon.className = "bi bi-search";

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
    const firstDay = this.$startDate.getValue().value;
    const lastDay = this.$endDate.getValue().value;
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
    const firstDay = this.$startDate.getValue().value;
    const lastDay = this.$endDate.getValue().value;
    const weekData = await getNumberByDate({
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
      dataSet: this.dataSet,
      max: 40
    });
    this.$chartBox.appendChild(this.$chart.render());
  };
  render() {
    if (role === "admin") {
      this.getAllUser();
    }
    this.$container.appendChild(this.$control);
    this.$container.appendChild(this.$box);
    this.$control.appendChild(this.$inputGroup);
    this.$control.appendChild(this.$userBox);

    this.$inputGroup.appendChild(this.$startDate.render());
    this.$inputGroup.appendChild(this.$endDate.render());
    this.$inputGroup.appendChild(this.$submitBtn);

    this.$submitBtn.appendChild(this.$searchIcon);

    this.$box.appendChild(this.$chartBox);
    this.$box.appendChild(this.$tableBox);
    this.getDateData();
    this.getBrandData();
    return this.$container;
  }
}
export default ReportLeadRange;
