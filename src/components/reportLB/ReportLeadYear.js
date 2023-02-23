import BarChart from "../BarChart.js"
import ReportTable from "./ReportTable.js"

class ReportLeadYear {

    labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

    dataSet = [{
        label: 'Lead',
        backgroundColor: '#1a73e8',
        borderColor: '#1a73e8',
        highlightFill: '#1a73e8',
        highlightStroke: '#1a73e8',
        data: [10, 20, 30, 40, 50, 56, 80, 10, 20, 30, 40, 25]
    }, {
        label: 'Booking',
        backgroundColor: 'red',
        borderColor: 'red',
        highlightFill: 'red',
        highlightStroke: 'red',
        data: [5, 18, 25, 30, 35, 50, 70, 5, 18, 16, 39, 10]
    }]
    branchData = [{
        name: 'Paris',
        lead: '400',
        booking: '350'
    }, {
        name: 'Kangnam',
        lead: '500',
        booking: '400'
    }, {
        name: 'Hồng Hà',
        lead: '200',
        booking: '150'
    }, {
        name: 'Đông Á',
        lead: '300',
        booking: '150'
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
export default ReportLeadYear