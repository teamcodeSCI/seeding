import { getBrand } from "../../apis/getInfo.js";
import { getCustomerSuccess, getRevenue } from "../../apis/reportNumber.js";
import { getUser } from "../../apis/userList.js";
import { role } from "../../util/const.js";
import { splitStr } from "../../util/splitStr.js";
import { random } from "../../util/util.js";
import BarChart from "../BarChart.js";
import DoughnutChart from "../DoughnutChart.js";
import Filter from "../Filter.js";
import FilterByBrand from "../FilterByBrand.js";
import SearchInput from "../SearchInput.js";
import RevenueTable from "./RevenueTable.js";

class TargetDay {
  all = "";
  kn = "";
  pr = "";
  da = "";
  hh = "";
  targetLabels = ["Doanh số", "Chưa đạt"];
  targetDataSet = [
    {
      data: [],
      backgroundColor: ["#0d6efd", "#e3e3e3"]
    }
  ];
  revenueBrandLabels = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật"
  ];
  revenueBrandDataSet = [
    {
      label: "Tất cả",
      backgroundColor: "rgb(255, 106, 0,0.5)",
      borderColor: "rgb(255, 106, 0,0.5)",
      highlightFill: "rgb(255, 106, 0,0.5)",
      highlightStroke: "rgb(255, 106, 0,0.5)",
      data: []
    },
    {
      label: "Paris",
      backgroundColor: "rgba(0, 86, 162,0.5)",
      borderColor: "rgba(0, 86, 162,0.5)",
      highlightFill: "rgba(0, 86, 162,0.5)",
      highlightStroke: "rgba(0, 86, 162,0.5)",
      data: []
    },
    {
      label: "Kangnam",
      backgroundColor: "rgba(183, 44, 38,0.5)",
      borderColor: "rgba(183, 44, 38,0.5)",
      highlightFill: "rgba(183, 44, 38,0.5)",
      highlightStroke: "rgba(183, 44, 38,0.5)",
      data: []
    },
    {
      label: "Đông Á",
      backgroundColor: "rgba(0, 159, 151,0.5)",
      borderColor: "rgba(0, 159, 151,0.5)",
      highlightFill: "rgba(0, 159, 151,0.5)",
      highlightStroke: "rgba(0, 159, 151,0.5)",
      data: []
    },
    {
      label: "Hồng Hà",
      backgroundColor: "rgba(161, 0, 243,0.5)",
      borderColor: "rgba(161, 0, 243,0.5)",
      highlightFill: "rgba(161, 0, 243,0.5)",
      highlightStroke: "rgba(161, 0, 243,0.5)",
      data: []
    }
  ];

  user = "";
  filter = "";
  search = "";

  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "targetDay";

    this.$control = document.createElement("div");
    this.$control.className =
      "d-flex justify-content-end my-3 align-items-end mx-3";

    this.$userBox = document.createElement("div");
    this.$userBox.style.zIndex = "11";

    this.$container = document.createElement("div");
    this.$container.className = "d-flex gap-5 mb-4 align-items-start";

    this.$targetBox = document.createElement("div");
    this.$targetBox.className = "targetBox w-25 position-relative";

    this.$targetTitle = document.createElement("div");
    this.$targetTitle.className =
      "targetTitle fs-5 fw-bold text-uppercase mb-2 text-center";
    this.$targetTitle.innerHTML = "Mục tiêu";

    this.$targetText = document.createElement("span");
    this.$targetText.className =
      "text-center d-block position-absolute start-50 top-50 fw-bold text-uppercase fs-4";
    this.$targetText.style.transform = "translate(-50%,0%)";
    this.$targetText.style.color = "#0d6efd";

    this.$revenueServiceBox = document.createElement("div");
    this.$revenueServiceBox.className = "revenueServiceBox w-75";

    this.$filterSearch = document.createElement("div");
    this.$filterSearch.className = "mb-2 d-flex justify-content-end gap-3";

    this.$searchService = new SearchInput({
      placeholder: "Tìm theo tên dịch vụ ...",
      width: "20%",
      filterSearch: this.filterSearch
    });
    this.$filterBox = document.createElement("div");

    this.$revenueTitle = document.createElement("div");
    this.$revenueTitle.className =
      "revenueTitle fs-5 fw-bold text-uppercase mb-2 text-center";
    this.$revenueTitle.innerHTML = "Doanh thu theo dịch vụ";

    this.$revenueOverflow = document.createElement("div");
    this.$revenueOverflow.style.maxHeight = "220px";
    this.$revenueOverflow.style.overflow = "auto";

    this.$revenueBrandBox = document.createElement("div");
    this.$revenueBrandBox.className = "revenueBrandBox";

    this.$revenueBrandTitle = document.createElement("div");
    this.$revenueBrandTitle.className =
      "revenueBrandTitle fs-5 fw-bold text-uppercase mb-2 text-center";
    this.$revenueBrandTitle.innerHTML = "Doanh thu theo thương hiệu";
  }
  setUser = (val) => {
    this.user = val;
  };
  setFilter = (val) => {
    this.filter = val;
  };
  filterSearch = () => {
    this.search = this.$searchService.getValue();
    this.getCustomer();
    this.getTarget();
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
  getAllUser = async () => {
    const fetchUser = await getUser({ userCode: this.user });
    this.$userBox.innerHTML = "";
    this.$selectUser = new Filter({
      data: fetchUser.data,
      filterSearch: this.filterSearch,
      setUser: this.setUser,
      title: "Nhân viên"
    });

    this.$userBox.appendChild(this.$selectUser.render());
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
    this.$revenueTable = new RevenueTable({
      data: getData.tong_tien
    });
    this.$revenueOverflow.innerHTML = "";
    this.$revenueOverflow.appendChild(this.$revenueTable.render());
  };
  getRevenueBrand = async () => {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    const getData = await getRevenue({
      startDate: firstday,
      endDate: lastday,
      user: this.user
    });
    this.revenueBrandDataSet[0].data = getData.data.all;
    this.revenueBrandDataSet[1].data = getData.data.pr;
    this.revenueBrandDataSet[2].data = getData.data.kn;
    this.revenueBrandDataSet[3].data = getData.data.da;
    this.revenueBrandDataSet[4].data = getData.data.hh;
    this.$revenueBrandChart = new BarChart({
      labels: this.revenueBrandLabels,
      dataSet: this.revenueBrandDataSet,
      max: 100000000
    });
    this.$revenueBrandBox.innerHTML = "";
    this.$revenueBrandBox.appendChild(this.$revenueBrandTitle);
    this.$revenueBrandBox.appendChild(this.$revenueBrandChart.render());
  };
  getTarget = async () => {
    const fetchUser = await getUser({
      userCode:
        role === "user"
          ? splitStr(localStorage.getItem("token")).code
          : this.user || "US0000015"
    });
    const user = fetchUser.data.pop();
    this.$targetText.innerHTML = `${(user.kpi_now / user.kpi_target) * 100}%`;
    this.targetDataSet[0].data = [user.kpi_now, user.kpi_target - user.kpi_now];
    this.$targetChart = new DoughnutChart({
      labels: this.targetLabels,
      dataSet: this.targetDataSet
    });
    this.$targetBox.innerHTML = "";
    this.$targetBox.appendChild(this.$targetTitle);
    this.$targetBox.appendChild(this.$targetChart.render());
    this.$targetBox.appendChild(this.$targetText);
  };
  render() {
    this.getTarget();
    this.getRevenueBrand();
    this.getCustomer();
    if (role === "admin") {
      this.getAllUser();
    }
    this.getAllBrand();
    this.$wrapper.appendChild(this.$control);
    this.$control.appendChild(this.$userBox);

    this.$wrapper.appendChild(this.$container);
    this.$wrapper.appendChild(this.$revenueBrandBox);

    this.$container.appendChild(this.$targetBox);
    this.$container.appendChild(this.$revenueServiceBox);

    this.$revenueServiceBox.appendChild(this.$revenueTitle);
    this.$revenueServiceBox.appendChild(this.$filterSearch);
    this.$revenueServiceBox.appendChild(this.$revenueOverflow);

    this.$filterSearch.appendChild(this.$filterBox);
    this.$filterSearch.appendChild(this.$searchService.render());

    return this.$wrapper;
  }
}
export default TargetDay;
