import Filter from "../Filter.js"
import ReportCard from "../ReportCard.js"
import SearchInput from "../SearchInput.js"
import ReportBrand from "./ReportBrand.js"
import ReportService from "./ReportService.js"

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
    branchData = [{
        name: 'Paris',
        revenue: '1000000',
        deposits: '300000',
        owed: '700000'
    }, {
        name: 'Kangnam',
        revenue: '1500000',
        deposits: '500000',
        owed: '1000000'
    }, {
        name: 'Hồng Hà',
        revenue: '5000000',
        deposits: '3000000',
        owed: '2000000'
    }, {
        name: 'Đông Á',
        revenue: '4000000',
        deposits: '2000000',
        owed: '2000000'
    }]
    serviceData = [{
        name: 'Niềng răng',
        brand: 'Paris',
        revenue: '1000000',
        deposits: '300000',
        owed: '700000'
    }, {
        name: 'Nâng mũi',
        brand: 'Kangnam',
        revenue: '1500000',
        deposits: '500000',
        owed: '1000000'
    }, {
        name: 'Cắt mí',
        brand: 'Hồng Hà',
        revenue: '5000000',
        deposits: '3000000',
        owed: '2000000'
    }, {
        name: 'Nâng ngực',
        brand: 'Đông Á',
        revenue: '4000000',
        deposits: '2000000',
        owed: '2000000'
    }]
    constructor() {
        this.$container = document.createElement('div')

        this.$cardGroup = document.createElement('div')
        this.$cardGroup.className = 'd-flex align-items-center gap-3 mb-3'

        this.$chartBox = document.createElement('div')
        this.$chartBox.className = 'chart'
        this.$chartBox.style.width = '60%'

        this.$tableBox = document.createElement('div')
        this.$tableBox.className = 'd-flex gap-3 mb-3'

        this.$tableBrand = document.createElement('div')
        this.$tableBrand.className = 'tableBrand'
        this.$tableBrand.style.width = '40%'

        this.$tableService = document.createElement('div')
        this.$tableService.className = 'tableService'


        this.$filterSearch = document.createElement('div')
        this.$filterSearch.className = 'mb-2 d-flex justify-content-end gap-3'
        this.$brand = new ReportBrand({ data: this.branchData })

        this.$service = new ReportService({ data: this.serviceData })

        this.$searchService = new SearchInput({ placeholder: 'Tìm theo tên dịch vụ ...', width: '20%' })
        this.$filterService = new Filter({})

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

        this.$container.appendChild(this.$tableBox)
        this.$container.appendChild(this.$tableService)
        this.$tableBox.appendChild(this.$chartBox)
        this.$tableBox.appendChild(this.$tableBrand)

        this.$tableBrand.appendChild(this.$brand.render())

        this.$tableService.appendChild(this.$filterSearch)
        this.$filterSearch.appendChild(this.$filterService.render())
        this.$filterSearch.appendChild(this.$searchService.render())
        this.$tableService.appendChild(this.$service.render())



        this.renderCardItem()
        return this.$container
    }
}
export default ReportCostWeek