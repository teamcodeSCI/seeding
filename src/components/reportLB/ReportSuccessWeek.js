import Filter from "../Filter.js"
import LineChart from "../LineChart.js"
import SearchInput from "../SearchInput.js"
import SuccessTable from "./SuccessTable.js"

class ReportSuccessWeek {

    labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
    dataSet = [{
        label: 'Tất cả',
        backgroundColor: '#1a73e8',
        borderColor: '#1a73e8',
        highlightFill: '#1a73e8',
        highlightStroke: '#1a73e8',
        data: [10, 20, 30, 40, 50, 60, 70]
    }, {
        label: 'Paris',
        backgroundColor: 'blue',
        borderColor: 'blue',
        highlightFill: 'blue',
        highlightStroke: 'blue',
        data: [16, 20, 40, 35, 26, 17, 45]
    }, {
        label: 'Kangnam',
        backgroundColor: 'orange',
        borderColor: 'orange',
        highlightFill: 'orange',
        highlightStroke: 'orange',
        data: [20, 46, 40, 30, 35, 22, 37]
    }, {
        label: 'Đông Á',
        backgroundColor: 'green',
        borderColor: 'green',
        highlightFill: 'green',
        highlightStroke: 'green',
        data: [25, 40, 22, 15, 40, 42, 50]
    }, {
        label: 'Hồng Hà',
        backgroundColor: 'red',
        borderColor: 'red',
        highlightFill: 'red',
        highlightStroke: 'red',
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

        this.$tableBox.appendChild(this.$filterSearch)
        this.$tableBox.appendChild(this.$serviceBookingRp.render())
        this.$filterSearch.appendChild(this.$filterService.render())
        this.$filterSearch.appendChild(this.$searchService.render())

        this.$chartBox.appendChild(this.$lineChart.render())
        return this.$box
    }
}
export default ReportSuccessWeek