import SuccessTableItem from "./SuccessTableItem.js"

class SuccessTable {
    constructor({ data }) {
        this.data = data
        this.$table = document.createElement('table')
        this.$table.className = 'table w-100'
        this.$table.style.fontSize = '14px'

        this.$thead = document.createElement('thead')
        this.$headerTr = document.createElement('tr')

        this.$stt = document.createElement('th')
        this.$stt.innerHTML = 'STT'

        this.$service = document.createElement('th')
        this.$service.innerHTML = 'Dịch vụ'

        this.$brand = document.createElement('th')
        this.$brand.innerHTML = 'Thương hiệu'

        this.$numberic = document.createElement('th')
        this.$numberic.innerHTML = 'Số lượng'

        this.$tbody = document.createElement('tbody')

    }
    renderItem = async() => {
        this.$tbody.innerHTML = ''
        this.data.forEach((item, idx) => {
            this.$item = new SuccessTableItem({
                stt: idx + 1,
                service: item.service,
                brand: item.brand,
                number: item.number
            })
            this.$tbody.appendChild(this.$item.render())
        })

    }
    render() {
        this.$table.appendChild(this.$thead)
        this.$table.appendChild(this.$tbody)
        this.$thead.appendChild(this.$headerTr)
        this.$headerTr.appendChild(this.$stt)
        this.$headerTr.appendChild(this.$service)
        this.$headerTr.appendChild(this.$brand)
        this.$headerTr.appendChild(this.$numberic)
        this.renderItem()
        return this.$table
    }
}
export default SuccessTable