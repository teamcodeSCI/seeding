import BarChart from "../BarChart.js"
import ReportCard from "../ReportCard.js"

class ReportCostWeek {
    data = [
        { title: 'Doanh thu', now: '1000000', part: '2000000' },
        { title: 'Tiền đặt cọc', now: '300000', part: '500000' },
        { title: 'Còn nợ', now: '700000', part: '1500000' }
    ]
    labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
    dataSet = [{
        label: 'Đặt cọc',
        backgroundColor: 'green',
        borderColor: 'green',
        highlightFill: 'green',
        highlightStroke: 'green',
        data: [300000, 500000, 3000000, 2000000, 2000000, 1000000, 700000]
    }, {
        label: 'Doanh thu',
        backgroundColor: '#1a73e8',
        borderColor: '#1a73e8',
        highlightFill: '#1a73e8',
        highlightStroke: '#1a73e8',
        data: [1000000, 1500000, 5000000, 4000000, 6000000, 3000000, 2000000]
    }, {
        label: 'Còn nợ',
        backgroundColor: 'red',
        borderColor: 'red',
        highlightFill: 'red',
        highlightStroke: 'red',
        data: [700000, 1000000, 2000000, 2000000, 4000000, 2000000, 1300000]
    }]
    constructor() {
        this.$container = document.createElement('div')

        this.$cardGroup = document.createElement('div')
        this.$cardGroup.className = 'd-flex align-items-center gap-3 mb-3'

        this.$chartBox = document.createElement('div')
        this.$chartBox.className = 'chart'

        this.$chart = new BarChart({ labels: this.labels, dataSet: this.dataSet })
    }
    renderCardItem = () => {
        this.$cardGroup.innerHTML = ''
        for (let item of this.data) {
            this.$cardItem = new ReportCard({ title: item.title, today: item.now, desc: 'Hôm qua', part: item.part, isMoney: true })
            this.$cardGroup.appendChild(this.$cardItem.render())
        }
    }
    render() {
        this.$container.appendChild(this.$cardGroup)
        this.$container.appendChild(this.$chartBox)
        this.$chartBox.appendChild(this.$chart.render())

        this.renderCardItem()
        return this.$container
    }
}
export default ReportCostWeek