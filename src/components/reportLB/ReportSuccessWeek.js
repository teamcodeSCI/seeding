import Filter from "../Filter.js"

import SearchInput from "../SearchInput.js"
import SuccessTable from "./SuccessTable.js"
import LineChart from "../LineChart.js"
import { random } from "../../util/util.js"
import { getCustomerSuccess } from "../../apis/reportNumber.js"
import Loading from "../Loading.js"
import { app } from "../../util/const.js"

class ReportSuccessWeek {

    labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
    dataSet = [{
        label: 'Tất cả',
        borderColor: "#ff6a00",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 3,
        pointRadius: 2,
        data: [random(), random(), random(), random(), random(), random(), random()]
    }, {
        label: 'Paris',
        borderColor: "rgb(0, 86, 162)",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random(), random(), random(), random()]
    }, {
        label: 'Kangnam',
        borderColor: "rgb(183, 44, 38)",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random(), random(), random(), random()]
    }, {
        label: 'Đông Á',
        borderColor: "#009f97",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random(), random(), random(), random()]
    }, {
        label: 'Hồng Hà',
        borderColor: "#a100f3",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random(), random(), random(), random()]
    }]
    search = ''
    filter = ''
    constructor() {
        this.$loading = new Loading()
        this.$box = document.createElement('div')
        this.$box.className = 'd-flex gap-3 align-items-start'

        this.$filterSearch = document.createElement('div')
        this.$filterSearch.className = 'mb-2 d-flex justify-content-end gap-3'

        this.$chartBox = document.createElement('div')
        this.$chartBox.style.width = '50%'

        this.$tableBox = document.createElement('div')
        this.$tableBox.style.width = '50%'

        this.$table = document.createElement('div')
        this.$table.style.maxHeight = '220px'
        this.$table.style.overflowY = 'auto'

        this.$lineChart = new LineChart({ labels: this.labels, dataSet: this.dataSet })
        this.$searchService = new SearchInput({ placeholder: 'Tìm theo tên dịch vụ ...', width: '20%', filterSearch: this.filterSearch })
        this.$filterService = new Filter({ filterSearch: this.filterSearch })
    }
    filterSearch = () => {
        this.search = this.$searchService.getValue()
        this.filter = this.$filterService.getValue()
        this.getCustomer()
    }
    getCustomer = async() => {
        app.appendChild(this.$loading.render())
        const getData = await getCustomerSuccess({ search: this.search, filter: this.filter })
        this.$serviceBookingRp = new SuccessTable({ data: getData.data })
        this.$table.innerHTML = ''
        this.$table.appendChild(this.$serviceBookingRp.render())
        app.removeChild(this.$loading.render())
    }
    render() {
        this.getCustomer()
        this.$box.appendChild(this.$tableBox)
        this.$box.appendChild(this.$chartBox)
        this.$chartBox.appendChild(this.$lineChart.render())
        this.$filterSearch.appendChild(this.$filterService.render())
        this.$filterSearch.appendChild(this.$searchService.render())
        this.$tableBox.appendChild(this.$filterSearch)
        this.$tableBox.appendChild(this.$table)

        return this.$box
    }
}
export default ReportSuccessWeek