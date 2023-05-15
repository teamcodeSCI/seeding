import ReportTableItem from "./ReportTableItem.js"

class ReportTable {
    constructor({ data }) {
        this.data = data
        this.$table = document.createElement('table')
        this.$table.className = 'table w-100'
        this.$table.style.fontSize = '15px'
        this.$thead = document.createElement('thead')
        this.$headerTr = document.createElement('tr')

        this.$stt = document.createElement('th')
        this.$stt.innerHTML = 'STT'

        this.$name = document.createElement('th')
        this.$name.innerHTML = 'Thương hiệu'

        this.$lead = document.createElement('th')
        this.$lead.innerHTML = 'Form'

        this.$booking = document.createElement('th')
        this.$booking.innerHTML = 'Booking'

        this.$tbody = document.createElement('tbody')
        this.renderItem()
    }
    renderItem = () => {
        this.$tbody.innerHTML = ''
        this.data.forEach((item, idx) => {
            this.$item = new ReportTableItem({
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
        this.$headerTr.appendChild(this.$lead)
        this.$headerTr.appendChild(this.$booking)
        return this.$table
    }
}
export default ReportTable