import DoughnutChart from "../DoughnutChart.js"
import RevenueTable from "./RevenueTable.js"

class TargetDay {
    labels = ['Doanh số', 'Chưa đạt']
    dataSet = [{
        data: [70000000, 30000000],
        backgroundColor: [
            '#0d6efd',
            '#e3e3e3'
        ],
    }]

    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'targetDay d-flex gap-5'

        this.$targetBox = document.createElement('div')
        this.$targetBox.className = 'targetBox w-25 position-relative'

        this.$targetTitle = document.createElement('div')
        this.$targetTitle.className = 'targetTitle fs-5 fw-bold text-uppercase mb-2 text-center'
        this.$targetTitle.innerHTML = 'Mục tiêu'

        this.$targetText = document.createElement('span')
        this.$targetText.className = 'text-center d-block position-absolute start-50 top-50 fw-bold text-uppercase fs-4'
        this.$targetText.style.transform = 'translate(-50%,0%)'
        this.$targetText.style.color = '#0d6efd'
        this.$targetText.innerHTML = `${70000000/100000000*100}%`

        this.$revenueBrandBox = document.createElement('div')
        this.$revenueBrandBox.className = 'revenueBrandBox w-75'

        this.$revenueTitle = document.createElement('div')
        this.$revenueTitle.className = 'revenueTitle fs-5 fw-bold text-uppercase mb-2 text-center'
        this.$revenueTitle.innerHTML = 'Doanh thu theo dịch vụ'

        this.$targetChart = new DoughnutChart({ labels: this.labels, dataSet: this.dataSet })

        this.$revenueTable = new RevenueTable({})
    }
    render() {
        this.$container.appendChild(this.$targetBox)
        this.$container.appendChild(this.$revenueBrandBox)
        this.$targetBox.appendChild(this.$targetTitle)
        this.$targetBox.appendChild(this.$targetChart.render())
        this.$targetBox.appendChild(this.$targetText)
        this.$revenueBrandBox.appendChild(this.$revenueTitle)
        this.$revenueBrandBox.appendChild(this.$revenueTable.render())
        return this.$container
    }
}
export default TargetDay