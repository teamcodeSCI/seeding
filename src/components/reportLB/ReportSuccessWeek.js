import Filter from "../Filter.js";

import SearchInput from "../SearchInput.js";
import SuccessTable from "./SuccessTable.js";
import LineChart from "../LineChart.js";
import { random } from "../../util/util.js";
import { getCustomerSuccess } from "../../apis/reportNumber.js";

import { app } from "../../util/const.js";
import { getBrand } from "../../apis/getInfo.js";
import FilterByBrand from "../FilterByBrand.js";
import { getUser } from "../../apis/userList.js";

class ReportSuccessWeek {
  labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  dataSet = [
    {
      label: "Tất cả",
      borderColor: "#ff6a00",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 3,
      pointRadius: 2,
      data: [
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random()
      ]
    },
    {
      label: "Paris",
      borderColor: "rgb(0, 86, 162)",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random()
      ]
    },
    {
      label: "Kangnam",
      borderColor: "rgb(183, 44, 38)",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random()
      ]
    },
    {
      label: "Đông Á",
      borderColor: "#009f97",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random()
      ]
    },
    {
      label: "Hồng Hà",
      borderColor: "#a100f3",
      backgroundColor: "rgba(209, 237, 228,0.3)",
      borderWidth: 2,
      pointRadius: 1,
      hidden: true,
      data: [
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random()
      ]
    }
  ];
  search = "";
  filter = "";
  user = "";
  constructor() {
    this.$container = document.createElement("div");
    this.$container.className = "reportsuccessWeek";

    this.$control = document.createElement("div");
    this.$control.className =
      "d-flex justify-content-end my-3 align-items-end mx-3";

    this.$userBox = document.createElement("div");

    this.$box = document.createElement("div");
    this.$box.className = "d-flex gap-3 align-items-start";

    this.$filterSearch = document.createElement("div");
    this.$filterSearch.className = "mb-2 d-flex justify-content-end gap-3";
    this.$filterBox = document.createElement("div");

    this.$chartBox = document.createElement("div");
    this.$chartBox.style.width = "50%";

    this.$tableBox = document.createElement("div");
    this.$tableBox.style.width = "50%";

    this.$table = document.createElement("div");
    this.$table.style.maxHeight = "220px";
    this.$table.style.overflowY = "auto";

    this.$lineChart = new LineChart({
      labels: this.labels,
      dataSet: this.dataSet
    });
    this.$searchService = new SearchInput({
      placeholder: "Tìm theo tên dịch vụ ...",
      width: "20%",
      filterSearch: this.filterSearch
    });
    this.$filterService = new Filter({ filterSearch: this.filterSearch });
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
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    const getData = await getCustomerSuccess({
      search: this.search,
      filter: this.filter,
      startDate: firstday,
      endDate: lastday,
      user: this.user
    });
    this.$serviceBookingRp = new SuccessTable({
      data: getData.data
    });
    this.$table.innerHTML = "";
    this.$table.appendChild(this.$serviceBookingRp.render());
  };
  render() {
    this.getAllBrand();
    this.getCustomer();
    this.getAllUser();
    this.$container.appendChild(this.$control);
    this.$container.appendChild(this.$box);

    this.$control.appendChild(this.$userBox);
    this.$box.appendChild(this.$tableBox);
    this.$box.appendChild(this.$chartBox);
    this.$chartBox.appendChild(this.$lineChart.render());
    this.$filterSearch.appendChild(this.$filterBox);
    this.$filterSearch.appendChild(this.$searchService.render());
    this.$tableBox.appendChild(this.$filterSearch);
    this.$tableBox.appendChild(this.$table);

    return this.$container;
  }
}
export default ReportSuccessWeek;
