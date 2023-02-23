import { random } from "../../util/util.js"
import Filter from "../Filter.js"
import LineChart from "../LineChart.js"
import SearchInput from "../SearchInput.js"
import ReportTable from "./ReportTable.js"
import SuccessTable from "./SuccessTable.js"

class ReportSuccessMonth {
    labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
    dataSet = [{
        label: 'Tất cả',
        borderColor: "#ff6a00",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 3,
        pointRadius: 2,
        data: [random(), random(), random(), random()]
    }, {
        label: 'Paris',
        borderColor: "rgb(0, 86, 162)",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random()]
    }, {
        label: 'Kangnam',
        borderColor: "rgb(183, 44, 38)",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random()]
    }, {
        label: 'Đông Á',
        borderColor: "#009f97",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random()]
    }, {
        label: 'Hồng Hà',
        borderColor: "#a100f3",
        backgroundColor: "rgba(209, 237, 228,0.3)",
        borderWidth: 2,
        pointRadius: 1,
        hidden: true,
        data: [random(), random(), random(), random()]
    }]
    branchData = [{
        name: 'Paris',
        lead: '50',
        booking: '40'
    }, {
        name: 'Kangnam',
        lead: '80',
        booking: '50'
    }, {
        name: 'Hồng Hà',
        lead: '20',
        booking: '8'
    }, {
        name: 'Đông Á',
        lead: '40',
        booking: '25'
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
export default ReportSuccessMonth