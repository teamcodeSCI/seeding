import ReportBrandItem from "./ReportBrandItem.js"

class ReportBrand {
    constructor({ data }) {
        this.data = data
        this.$table = document.createElement('table')
        this.$table.className = 'table w-100'
        this.$table.style.fontSize = '14px'

        this.$thead = document.createElement('thead')
        this.$headerTr = document.createElement('tr')

        this.$stt = document.createElement('th')
        this.$stt.innerHTML = 'STT'

        this.$name = document.createElement('th')
        this.$name.innerHTML = 'Thương hiệu'

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
        this.data.forEach((item, idx) => {
            this.$item = new ReportBrandItem({
                stt: idx + 1,
                name: item.name,
                lead: item.lead,
                booking: item.booking
            })
            this.$tbody.appendChild(this.$item.render())
        })
        return this.$tbody
    }
    render() {
        this.$table.appendChild(this.$thead)
        this.$table.appendChild(this.$tbody)
        this.$thead.appendChild(this.$headerTr)
        this.$headerTr.appendChild(this.$stt)
        this.$headerTr.appendChild(this.$name)
        this.$headerTr.appendChild(this.$revenue)
        this.$headerTr.appendChild(this.$deposits)
        this.$headerTr.appendChild(this.$owed)
        return this.$table
    }
}
export default ReportBrand