import { formatNumber } from "../../util/util.js"

class RevenueTableItem {
    constructor({ stt, service, brand, revenue }) {
        this.$tr = document.createElement('tr')
        this.$tr.className = 'align-middle'

        this.$stt = document.createElement('td')
        this.$stt.innerHTML = stt

        this.$service = document.createElement('td')
        this.$service.innerHTML = service

        this.$brand = document.createElement('td')
        this.$brand.innerHTML = brand

        this.$revenue = document.createElement('td')
        this.$revenue.style.width = '45%'

        this.$revenueBox = document.createElement('div')
        this.$revenueBox.className = 'd-flex align-items-center gap-2'

        this.$progress = document.createElement('div')
        this.$progress.className = 'progress w-100'
        this.$progress.style.height = '10px'

        this.$progressBar = document.createElement('div')
        this.$progressBar.className = 'progress-bar'
        this.$progressBar.style.width = '50%'

        this.$number = document.createElement('span')
        this.$number.innerHTML = `${formatNumber(revenue)}Đ`

    }
    render() {
        this.$tr.appendChild(this.$stt)
        this.$tr.appendChild(this.$service)
        this.$tr.appendChild(this.$brand)
        this.$tr.appendChild(this.$revenue)
        this.$revenue.appendChild(this.$revenueBox)
        this.$revenueBox.appendChild(this.$progress)
        this.$revenueBox.appendChild(this.$number)
        this.$progress.appendChild(this.$progressBar)

        return this.$tr
    }
}
export default RevenueTableItem