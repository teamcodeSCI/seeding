import Filter from "../Filter.js"

import SearchInput from "../SearchInput.js"
import SuccessTable from "./SuccessTable.js"
import LineChart from "../LineChart.js"
import { random } from "../../util/util.js"

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
    branchData = [{
        service: 'Niềng răng',
        brand: 'Paris',
        lead: '20',
    }, {
        service: 'Cắt mí',
        brand: 'Kangnam',
        booking: '20'
    }, {
        service: 'Hút mỡ',
        brand: 'Hồng Hà',
        booking: '5'
    }, {
        service: 'Nâng ngực',
        brand: 'Đông Á',
        booking: '15'
    }]
    constructor() {
        this.$box = document.createElement('div')
        this.$box.className = 'd-flex gap-3 align-items-start'

        this.$filterSearch = document.createElement('div')
        this.$filterSearch.className = 'mb-2 d-flex justify-content-end gap-3'

        this.$chartBox = document.createElement('div')
        this.$chartBox.style.width = '50%'

        this.$tableBox = document.createElement('div')
        this.$tableBox.style.width = '50%'

        this.$lineChart = new LineChart({ labels: this.labels, dataSet: this.dataSet })
        this.$searchService = new SearchInput({ placeholder: 'Tìm theo tên dịch vụ ...', width: '20%' })
        this.$filterService = new Filter({})

        this.$serviceBookingRp = new SuccessTable({ data: this.branchData })
    }
    render() {
        this.$box.appendChild(this.$tableBox)
        this.$box.appendChild(this.$chartBox)

        this.$chartBox.appendChild(this.$lineChart.render())
        this.$tableBox.appendChild(this.$filterSearch)
        this.$tableBox.appendChild(this.$serviceBookingRp.render())
        this.$filterSearch.appendChild(this.$filterService.render())
        this.$filterSearch.appendChild(this.$searchService.render())


        return this.$box
    }
}
export default ReportSuccessWeek