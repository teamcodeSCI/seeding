import { getNumberBrand } from "../../apis/reportNumber.js"
import { app } from "../../util/const.js"
import BarChart from "../BarChart.js"
import Loading from "../Loading.js"
import ReportTable from "./ReportTable.js"

class ReportLeadMonth {
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
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const brandData = await getNumberBrand({ startDate: firstDay, endDate: lastDay })

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
export default ReportLeadMonth