import { getBrand } from "../../apis/getInfo.js";
import { getCustomerSuccess } from "../../apis/reportNumber.js";

import { random } from "../../util/util.js";

import FilterByBrand from "../FilterByBrand.js";
import LineChart from "../LineChart.js";

import SearchInput from "../SearchInput.js";
import SuccessTable from "./SuccessTable.js";

class ReportSuccessMonth {
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

  constructor() {
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
  }
  filterSearch = () => {
    this.search = this.$searchService.getValue();
    this.getCustomer();
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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const getData = await getCustomerSuccess({
      search: this.search,
      filter: this.filter,
      startDate: firstDay,
      endDate: lastDay
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
    this.$box.appendChild(this.$tableBox);
    this.$box.appendChild(this.$chartBox);
    this.$chartBox.appendChild(this.$lineChart.render());
    this.$filterSearch.appendChild(this.$filterBox);
    this.$filterSearch.appendChild(this.$searchService.render());
    this.$tableBox.appendChild(this.$filterSearch);
    this.$tableBox.appendChild(this.$table);

    return this.$box;
  }
}
export default ReportSuccessMonth;
