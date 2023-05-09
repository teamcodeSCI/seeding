import { getBrand } from "../../apis/getInfo.js";
import {
  getCustomerSuccess,
  getSuccessByBrand
} from "../../apis/reportNumber.js";
import { getUser } from "../../apis/userList.js";
import { role } from "../../util/const.js";

import { random } from "../../util/util.js";
import Filter from "../Filter.js";

import FilterByBrand from "../FilterByBrand.js";
import InputGroup from "../InputGroup.js";
import LineChart from "../LineChart.js";

import SearchInput from "../SearchInput.js";
import SuccessTable from "./SuccessTable.js";

class ReportSuccessRange {
  labels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
  dataSet = [
    {
      label: "Tất cả",
      borderColor: "#ff6a00",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 3,
      pointRadius: 2,
      data: [random(), random(), random(), random()]
    },
    {
      label: "Paris",
      borderColor: "rgb(0, 86, 162)",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [random(), random(), random(), random()]
    },
    {
      label: "Kangnam",
      borderColor: "rgb(183, 44, 38)",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [random(), random(), random(), random()]
    },
    {
      label: "Đông Á",
      borderColor: "#009f97",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [random(), random(), random(), random()]
    },
    {
      label: "Hồng Hà",
      borderColor: "#a100f3",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [random(), random(), random(), random()]
    }
  ];
  search = "";
  filter = "";
  user = "";
  constructor() {
    this.$container = document.createElement("div");
    this.$container.className = "reportsuccessRange";

    this.$control = document.createElement("div");
    this.$control.className =
      "d-flex justify-content-between my-3 align-items-end mx-1";

    this.$userBox = document.createElement("div");

    this.$box = document.createElement("div");
    this.$box.className = "d-flex gap-3 align-items-start";

    this.$filterSearch = document.createElement("div");
    this.$filterSearch.className = "mb-2 d-flex justify-content-end gap-3";

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

    this.$filterBox = document.createElement("div");
    this.$chartBox = document.createElement("div");
    this.$chartBox.style.width = "50%";

    this.$tableBox = document.createElement("div");
    this.$tableBox.style.width = "50%";

    this.$table = document.createElement("div");
    this.$table.style.maxHeight = "220px";
    this.$table.style.overflowY = "auto";

    this.$searchService = new SearchInput({
      placeholder: "Tìm theo tên dịch vụ ...",
      width: "20%",
      filterSearch: this.filterSearch
    });
  }
  filterSearch = () => {
    this.search = this.$searchService.getValue();
    this.getCustomer();
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
  setFilter = (val) => {
    this.filter = val;
  };
  getAllBrand = async () => {
    const fetchBrand = await getBrand({ input: "" });
    this.$filterBox.innerHTML = "";
    this.$selectBrand = new FilterByBrand({
      data: fetchBrand,
      filterSearch: this.filterSearch,
      setFilter: this.setFilter,
      title: "Thương hiệu"
    });
    this.$filterBox.appendChild(this.$selectBrand.render());
  };
  getCustomer = async () => {
    const firstDay = this.$startDate.getValue().value;
    const lastDay = this.$endDate.getValue().value;
    const getData = await getCustomerSuccess({
      search: this.search,
      filter: this.filter,
      startDate: firstDay,
      endDate: lastDay,
      user: this.user
    });

    this.$serviceBookingRp = new SuccessTable({
      data: getData.so_luong
    });
    this.$table.innerHTML = "";
    this.$table.appendChild(this.$serviceBookingRp.render());
  };
  getCusByBrand = async () => {
    const firstDay = this.$startDate.getValue().value;
    const lastDay = this.$endDate.getValue().value;

    const getData = await getSuccessByBrand({
      startDate: firstDay,
      endDate: lastDay,
      userCode: this.user
    });
    this.labels = getData.data.date;
    this.dataSet[0].data = getData.data.all;
    this.dataSet[1].data = getData.data.pr;
    this.dataSet[2].data = getData.data.kn;
    this.dataSet[3].data = getData.data.da;
    this.dataSet[4].data = getData.data.hh;
    this.$lineChart = new LineChart({
      labels: this.labels,
      dataSet: this.dataSet
    });
    this.$chartBox.innerHTML = "";
    this.$chartBox.appendChild(this.$lineChart.render());
  };
  render() {
    this.$container.appendChild(this.$control);
    this.$container.appendChild(this.$box);
    this.$control.appendChild(this.$inputGroup);
    this.$control.appendChild(this.$userBox);

    this.$inputGroup.appendChild(this.$startDate.render());
    this.$inputGroup.appendChild(this.$endDate.render());
    this.$inputGroup.appendChild(this.$submitBtn);

    this.$submitBtn.appendChild(this.$searchIcon);
    this.$box.appendChild(this.$tableBox);
    this.$box.appendChild(this.$chartBox);

    this.$filterSearch.appendChild(this.$filterBox);
    this.$filterSearch.appendChild(this.$searchService.render());
    this.$tableBox.appendChild(this.$filterSearch);
    this.$tableBox.appendChild(this.$table);
    this.getAllBrand();
    this.getCustomer();
    this.getCusByBrand();
    if (role === "admin") {
      this.getAllUser();
    }
    return this.$container;
  }
}
export default ReportSuccessRange;
