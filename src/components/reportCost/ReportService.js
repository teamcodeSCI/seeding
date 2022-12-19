import ReportServiceItem from "./ReportServiceItem.js"

class ReportService {
    constructor({ data }) {
        this.data = data
        this.$table = document.createElement('table')
        this.$table.className = 'table w-100 m-0'
        this.$table.style.fontSize = '14px'

        this.$thead = document.createElement('thead')
        this.$headerTr = document.createElement('tr')

        this.$name = document.createElement('th')
        this.$name.innerHTML = 'Tên dịch vụ'

        this.$brand = document.createElement('th')
        this.$brand.innerHTML = 'Thương hiệu'

        this.$revenue = document.createElement('th')
        this.$revenue.innerHTML = 'Doanh thu'

        this.$deposits = document.createElement('th')
        this.$deposits.innerHTML = 'Đặt cọc'

        this.$owed = document.createElement('th')
        this.$owed.innerHTML = 'Còn nợ'

        this.$tbody = document.createElement('tbody')
        this.renderItem()
    }
    renderItem = () => {
        this.$tbody.innerHTML = ''
        this.data.forEach((item) => {
            this.$item = new ReportServiceItem({
                name: item.name,
                revenue: item.revenue,
                deposits: item.deposits,
                owed: item.owed,
                brand: item.brand
            })
            this.$tbody.appendChild(this.$item.render())
        })
        return this.$tbody
    }
    render() {
        this.$table.appendChild(this.$thead)
        this.$table.appendChild(this.$tbody)
        this.$thead.appendChild(this.$headerTr)

        this.$headerTr.appendChild(this.$name)
        this.$headerTr.appendChild(this.$brand)
        this.$headerTr.appendChild(this.$revenue)
        this.$headerTr.appendChild(this.$deposits)
        this.$headerTr.appendChild(this.$owed)
        return this.$table
    }
}
export default ReportService