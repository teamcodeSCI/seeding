import DoughnutChart from "../DoughnutChart.js"

class TargetDay {
    labels = ['Doanh số', 'Chưa đạt']
    dataSet = [{
        data: [70000000, 30000000],
        backgroundColor: [
            '#0c6',
            '#e3e3e3'
        ],
    }]

    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'TargetDay'

        this.$targetBox = document.createElement('div')
        this.$targetBox.className = 'targetBox w-25 mx-auto position-relative'

        this.$targetText = document.createElement('span')
        this.$targetText.className = 'text-center d-block position-absolute start-50 top-50 fw-bold text-uppercase fs-4'
        this.$targetText.style.transform = 'translate(-50%,-50%)'
        this.$targetText.style.color = '#0c6'
        this.$targetText.innerHTML = `${70000000/1000000}/${100000000/1000000} <br> Triệu`

        this.$revenueBrandBox = document.createElement('div')
        this.$revenueBrandBox.className = 'revenueBrandBox'

        this.$targetChart = new DoughnutChart({ labels: this.labels, dataSet: this.dataSet })
    }
    render() {
        this.$container.appendChild(this.$targetBox)
        this.$targetBox.appendChild(this.$targetChart.render())
        this.$targetBox.appendChild(this.$targetText)
        return this.$container
    }
}
export default TargetDay