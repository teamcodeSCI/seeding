import BarChart from "../BarChart.js"
import ReportTable from "./ReportTable.js"

class ReportLeadWeek {

    labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
    dataSet = [{
        label: 'Lead',
        backgroundColor: '#1a73e8',
        borderColor: '#1a73e8',
        highlightFill: '#1a73e8',
        highlightStroke: '#1a73e8',
        data: [10, 20, 30, 40, 50, 60, 70]
    }, {
        label: 'Booking',
        backgroundColor: 'red',
        borderColor: 'red',
        highlightFill: 'red',
        highlightStroke: 'red',
        data: [15, 20, 30, 35, 42, 25, 53]
    }]
    branchData = [{
        name: 'Paris',
        lead: '20',
        booking: '15'
    }, {
        name: 'Kangnam',
        lead: '30',
        booking: '20'
    }, {
        name: 'Hồng Hà',
        lead: '10',
        booking: '5'
    }, {
        name: 'Đông Á',
        lead: '25',
        booking: '15'
    }]
    constructor() {
        this.$box = document.createElement('div')
        this.$box.className = 'd-flex gap-3 align-items-start'
        this.$chartBox = document.createElement('div')
        this.$chartBox.style.width = '65%'
        this.$tableBox = document.createElement('div')
        this.$tableBox.style.width = '35%'

        this.$serviceBookingRp = new ReportTable({ data: this.branchData })
        this.$chart = new BarChart({ labels: this.labels, dataSet: this.dataSet })
    }
    render() {
        this.$box.appendChild(this.$chartBox)
        this.$chartBox.appendChild(this.$chart.render())

        this.$box.appendChild(this.$tableBox)
        this.$tableBox.appendChild(this.$serviceBookingRp.render())
        return this.$box
    }
}
export default ReportLeadWeek