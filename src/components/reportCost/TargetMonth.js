import { random } from "../../util/util.js"
import BarChart from "../BarChart.js"
import DoughnutChart from "../DoughnutChart.js"
import Filter from "../Filter.js"
import SearchInput from "../SearchInput.js"
import RevenueTable from "./RevenueTable.js"

class TargetMonth {
    targetLabels = ['Doanh số', 'Chưa đạt']
    targetDataSet = [{
        data: [70000000, 30000000],
        backgroundColor: [
            '#0d6efd',
            '#e3e3e3'
        ],
    }]
    revenueBrandLabels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
    revenueBrandDataSet = [{
        label: 'Tất cả',
        backgroundColor: '#ff6a00',
        borderColor: '#ff6a00',
        highlightFill: '#ff6a00',
        highlightStroke: '#ff6a00',
        data: [random(), random(), random(), random()]
    }, {
        label: 'Paris',
        backgroundColor: 'rgb(0, 86, 162)',
        borderColor: 'rgb(0, 86, 162)',
        highlightFill: 'rgb(0, 86, 162)',
        highlightStroke: 'rgb(0, 86, 162)',
        data: [random(), random(), random(), random()]
    }, {
        label: 'Kangnam',
        backgroundColor: 'rgb(183, 44, 38)',
        borderColor: 'rgb(183, 44, 38)',
        highlightFill: 'rgb(183, 44, 38)',
        highlightStroke: 'rgb(183, 44, 38)',
        data: [random(), random(), random(), random()]
    }, {
        label: 'Đông Á',
        backgroundColor: '#009f97',
        borderColor: '#009f97',
        highlightFill: '#009f97',
        highlightStroke: '#009f97',
        data: [random(), random(), random(), random()]
    }, {
        label: 'Hồng Hà',
        backgroundColor: '#a100f3',
        borderColor: '#a100f3',
        highlightFill: '#a100f3',
        highlightStroke: '#a100f3',
        data: [random(), random(), random(), random()]
    }]
    revenueData = [
        { service: 'Implant', brand: 'Paris', revenue: 10000000 },
        { service: 'Niềng răng', brand: 'Paris', revenue: 15000000 },
        { service: 'Cắt mí', brand: 'Paris', revenue: 5000000 },
        { service: 'Cắt mí', brand: 'Kangnam', revenue: 6000000 },
        { service: 'Nâng mũi', brand: 'Đông Á', revenue: 10000000 },
        { service: 'Nâng mũi', brand: 'Kangnam', revenue: 12000000 },
        { service: 'Nâng ngực', brand: 'Hồng Hà', revenue: 20000000 }
    ]
    constructor() {

        this.$wrapper = document.createElement('div')
        this.$wrapper.className = 'targetDay'

        this.$container = document.createElement('div')
        this.$container.className = 'd-flex gap-5 mb-4 align-items-start'

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

        this.$revenueServiceBox = document.createElement('div')
        this.$revenueServiceBox.className = 'revenueServiceBox w-75'

        this.$filterSearch = document.createElement('div')
        this.$filterSearch.className = 'mb-2 d-flex justify-content-end gap-3'

        this.$searchService = new SearchInput({ placeholder: 'Tìm theo tên dịch vụ ...', width: '20%' })
        this.$filterService = new Filter({})

        this.$revenueTitle = document.createElement('div')
        this.$revenueTitle.className = 'revenueTitle fs-5 fw-bold text-uppercase mb-2 text-center'
        this.$revenueTitle.innerHTML = 'Doanh thu theo dịch vụ'

        this.$targetChart = new DoughnutChart({ labels: this.targetLabels, dataSet: this.targetDataSet })
        this.$revenueTable = new RevenueTable({ data: this.revenueData })

        this.$revenueBrandBox = document.createElement('div')
        this.$revenueBrandBox.className = 'revenueBrandBox'

        this.$revenueBrandTitle = document.createElement('div')
        this.$revenueBrandTitle.className = 'revenueBrandTitle fs-5 fw-bold text-uppercase mb-2 text-center'
        this.$revenueBrandTitle.innerHTML = 'Doanh thu theo thương hiệu'

        this.$revenueBrandChart = new BarChart({ labels: this.revenueBrandLabels, dataSet: this.revenueBrandDataSet })
    }
    render() {
        this.$wrapper.appendChild(this.$container)
        this.$wrapper.appendChild(this.$revenueBrandBox)

        this.$container.appendChild(this.$targetBox)
        this.$container.appendChild(this.$revenueServiceBox)

        this.$targetBox.appendChild(this.$targetTitle)
        this.$targetBox.appendChild(this.$targetChart.render())
        this.$targetBox.appendChild(this.$targetText)

        this.$revenueServiceBox.appendChild(this.$revenueTitle)
        this.$revenueServiceBox.appendChild(this.$filterSearch)
        this.$revenueServiceBox.appendChild(this.$revenueTable.render())

        this.$revenueBrandBox.appendChild(this.$revenueBrandTitle)
        this.$revenueBrandBox.appendChild(this.$revenueBrandChart.render())

        this.$filterSearch.appendChild(this.$filterService.render())
        this.$filterSearch.appendChild(this.$searchService.render())

        return this.$wrapper
    }
}
export default TargetMonth