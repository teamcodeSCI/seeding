import Filter from "../Filter.js"
import LineChart from "../LineChart.js"
import SearchInput from "../SearchInput.js"
import ReportTable from "./ReportTable.js"
import SuccessTable from "./SuccessTable.js"

class ReportSuccessMonth {
    labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
    dataSet = [{
        label: 'Lead',
        backgroundColor: '#1a73e8',
        borderColor: '#1a73e8',
        highlightFill: '#1a73e8',
        highlightStroke: '#1a73e8',
        data: [10, 20, 30, 40]
    }, {
        label: 'Booking',
        backgroundColor: 'red',
        borderColor: 'red',
        highlightFill: 'red',
        highlightStroke: 'red',
        data: [5, 15, 20, 30]
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