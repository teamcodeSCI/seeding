import { formatNumber } from "../../util/util.js"

class RevenueTableItem {
    constructor({ stt, service, revenue, highest }) {
        this.$tr = document.createElement('tr')
        this.$tr.className = 'align-middle'

        this.$stt = document.createElement('td')
        this.$stt.style.width = '5%'
        this.$stt.innerHTML = stt

        this.$service = document.createElement('td')
        this.$service.style.width = '40%'
        this.$service.innerHTML = service

        this.$progressTd = document.createElement('td')
        this.$progressTd.style.width = '40%'

        this.$revenue = document.createElement('td')
        this.$revenue.style.width = '15%'
        this.$revenue.innerHTML = `${formatNumber(revenue)}Đ`

        this.$progress = document.createElement('div')
        this.$progress.className = 'progress w-100'
        this.$progress.style.height = '10px'

        this.$progressBar = document.createElement('div')
        this.$progressBar.className = 'progress-bar'
        this.$progressBar.style.width = `${(revenue * 100) / highest}%`;



    }
    render() {
        this.$tr.appendChild(this.$stt)
        this.$tr.appendChild(this.$service)
        this.$tr.appendChild(this.$progressTd)
        this.$tr.appendChild(this.$revenue)

        this.$progressTd.appendChild(this.$progress)
        this.$progress.appendChild(this.$progressBar)


        return this.$tr
    }
}
export default RevenueTableItem