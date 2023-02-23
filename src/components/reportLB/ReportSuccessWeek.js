import Filter from "../Filter.js"

import SearchInput from "../SearchInput.js"
import SuccessTable from "./SuccessTable.js"
import LineChart from "../LineChart.js"

class ReportSuccessWeek {

    labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
    dataSet = [{
        label: 'Tất cả',
        borderColor: "rgba(26, 115, 232,1)",
        backgroundColor: "rgba(26, 115, 232,0.1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [10, 20, 30, 40, 50, 60, 70]
    }, {
        label: 'Paris',
        borderColor: "rgba(0,0,255,1)",
        backgroundColor: "rgba(0,0,255,0.1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [16, 20, 40, 35, 26, 17, 45]
    }, {
        label: 'Kangnam',
        borderColor: "rgb(255, 165, 0,1)",
        backgroundColor: "rgba(255, 165, 0,0.1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [20, 46, 40, 30, 35, 22, 37]
    }, {
        label: 'Đông Á',
        borderColor: "rgba(0,128,0,1)",
        backgroundColor: "rgba(0,128,0,0.1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [25, 40, 22, 15, 40, 42, 50]
    }, {
        label: 'Hồng Hà',
        borderColor: "rgba(255,0,0,1)",
        backgroundColor: "rgba(255,0,0,0.1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [5, 10, 15, 20, 15, 17, 14]
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