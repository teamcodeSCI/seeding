import { getBrand } from "../../apis/getInfo.js";
import { getCustomerSuccess } from "../../apis/reportNumber.js";
import { getUser } from "../../apis/userList.js";
import { random } from "../../util/util.js";
import BarChart from "../BarChart.js";
import DoughnutChart from "../DoughnutChart.js";
import Filter from "../Filter.js";
import FilterByBrand from "../FilterByBrand.js";
import SearchInput from "../SearchInput.js";
import RevenueTable from "./RevenueTable.js";

class TargetMonth {
    targetLabels = ["Doanh số", "Chưa đạt"];
    targetDataSet = [{
        data: [70000000, 30000000],
        backgroundColor: ["#0d6efd", "#e3e3e3"]
    }];
    revenueBrandLabels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
    revenueBrandDataSet = [{
            label: "Tất cả",
            backgroundColor: "rgb(255, 106, 0,0.5)",
            borderColor: "rgb(255, 106, 0,0.5)",
            highlightFill: "rgb(255, 106, 0,0.5)",
            highlightStroke: "rgb(255, 106, 0,0.5)",
            data: [random(), random(), random(), random()]
        },
        {
            label: "Paris",
            backgroundColor: "rgba(0, 86, 162,0.5)",
            borderColor: "rgba(0, 86, 162,0.5)",
            highlightFill: "rgba(0, 86, 162,0.5)",
            highlightStroke: "rgba(0, 86, 162,0.5)",
            data: [random(), random(), random(), random()]
        },
        {
            label: "Kangnam",
            backgroundColor: "rgba(183, 44, 38,0.5)",
            borderColor: "rgba(183, 44, 38,0.5)",
            highlightFill: "rgba(183, 44, 38,0.5)",
            highlightStroke: "rgba(183, 44, 38,0.5)",
            data: [random(), random(), random(), random()]
        },
        {
            label: "Đông Á",
            backgroundColor: "rgba(0, 159, 151,0.5)",
            borderColor: "rgba(0, 159, 151,0.5)",
            highlightFill: "rgba(0, 159, 151,0.5)",
            highlightStroke: "rgba(0, 159, 151,0.5)",
            data: [random(), random(), random(), random()]
        },
        {
            label: "Hồng Hà",
            backgroundColor: "rgba(161, 0, 243,0.5)",
            borderColor: "rgba(161, 0, 243,0.5)",
            highlightFill: "rgba(161, 0, 243,0.5)",
            highlightStroke: "rgba(161, 0, 243,0.5)",
            data: [random(), random(), random(), random()]
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
        this.$targetText.innerHTML = `${(70000000 / 100000000) * 100}%`;

        this.$revenueServiceBox = document.createElement("div");
        this.$revenueServiceBox.className = "revenueServiceBox w-75";

        this.$filterSearch = document.createElement("div");
        this.$filterSearch.className = "mb-2 d-flex justify-content-end gap-3";

        this.$searchService = new SearchInput({
            placeholder: "Tìm theo tên dịch vụ ...",
            width: "20%"
        });
        this.$filterBox = document.createElement("div");

        this.$revenueTitle = document.createElement("div");
        this.$revenueTitle.className =
            "revenueTitle fs-5 fw-bold text-uppercase mb-2 text-center";
        this.$revenueTitle.innerHTML = "Doanh thu theo dịch vụ";

        this.$targetChart = new DoughnutChart({
            labels: this.targetLabels,
            dataSet: this.targetDataSet
        });

        this.$revenueOverflow = document.createElement("div");
        this.$revenueOverflow.style.maxHeight = "220px";
        this.$revenueOverflow.style.overflow = "auto";


        this.$revenueBrandBox = document.createElement("div");
        this.$revenueBrandBox.className = "revenueBrandBox";

        this.$revenueBrandTitle = document.createElement("div");
        this.$revenueBrandTitle.className =
            "revenueBrandTitle fs-5 fw-bold text-uppercase mb-2 text-center";
        this.$revenueBrandTitle.innerHTML = "Doanh thu theo thương hiệu";

        this.$revenueBrandChart = new BarChart({
            labels: this.revenueBrandLabels,
            dataSet: this.revenueBrandDataSet,
            max: 100000000
        });
    }
    setUser = (val) => {
        this.user = val;
    };
    setFilter = (val) => {
        this.filter = val;
    };
    filterSearch = () => {};
    getAllBrand = async() => {
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
    getAllUser = async() => {
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
    getCustomer = async() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const getData = await getCustomerSuccess({
            search: this.search,
            filter: this.filter,
            startDate: firstDay,
            endDate: lastDay,
            user: this.user
        });
        this.$revenueTable = new RevenueTable({
            data: getData.data
        });
        this.$revenueOverflow.innerHTML = ''
        this.$revenueOverflow.appendChild(this.$revenueTable.render());

    };
    render() {
        this.getCustomer()
        this.getAllUser();
        this.getAllBrand();

        this.$wrapper.appendChild(this.$control);
        this.$control.appendChild(this.$userBox);

        this.$wrapper.appendChild(this.$container);
        this.$wrapper.appendChild(this.$revenueBrandBox);

        this.$container.appendChild(this.$targetBox);
        this.$container.appendChild(this.$revenueServiceBox);

        this.$targetBox.appendChild(this.$targetTitle);
        this.$targetBox.appendChild(this.$targetChart.render());
        this.$targetBox.appendChild(this.$targetText);

        this.$revenueServiceBox.appendChild(this.$revenueTitle);
        this.$revenueServiceBox.appendChild(this.$filterSearch);
        this.$revenueServiceBox.appendChild(this.$revenueOverflow);


        this.$revenueBrandBox.appendChild(this.$revenueBrandTitle);
        this.$revenueBrandBox.appendChild(this.$revenueBrandChart.render());

        this.$filterSearch.appendChild(this.$filterBox);
        this.$filterSearch.appendChild(this.$searchService.render());

        return this.$wrapper;
    }
}
export default TargetMonth;