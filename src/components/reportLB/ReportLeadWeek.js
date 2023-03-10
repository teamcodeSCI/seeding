import { getNumberBrand } from "../../apis/reportNumber.js"
import { app } from "../../util/const.js"
import BarChart from "../BarChart.js"
import Loading from "../Loading.js"
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

    constructor() {
        this.$loading = new Loading()
        this.$box = document.createElement('div')
        this.$box.className = 'd-flex gap-3 align-items-start'
        this.$chartBox = document.createElement('div')
        this.$chartBox.style.width = '65%'
        this.$tableBox = document.createElement('div')
        this.$tableBox.style.width = '35%'
        this.$chart = new BarChart({ labels: this.labels, dataSet: this.dataSet })
    }
    getBrandData = async() => {
        app.appendChild(this.$loading.render())
        const curr = new Date(); // get current date
        const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
        const last = first + 6; // last day is the first day + 6
        const firstday = new Date(curr.setDate(first));
        const lastday = new Date(curr.setDate(last));
        const brandData = await getNumberBrand({ startDate: firstday, endDate: lastday })
        this.$serviceBookingRp = new ReportTable({ data: brandData.data })
        this.$tableBox.innerHTML = ''
        this.$tableBox.appendChild(this.$serviceBookingRp.render())
        app.removeChild(this.$loading.render())
    }
    render() {
        this.$box.appendChild(this.$chartBox)
        this.$chartBox.appendChild(this.$chart.render())

        this.$box.appendChild(this.$tableBox)
        this.getBrandData()
        return this.$box
    }
}
export default ReportLeadWeek