import { formatNumber } from "../util/util.js"

class ReportCard {
    constructor({ title, today, part, desc, isMoney }) {
            this.isMoney = isMoney || false
            this.today = today || 0
            this.part = part || 0
            this.$container = document.createElement('div')
            this.$container.className = `p-2 border border-1 rounded d-flex justify-content-between w-100`
            this.$container.style.minWidth = '200px'

            this.$info = document.createElement('div')

            this.$title = document.createElement('div')
            this.$title.className = ''
            this.$title.style.fontSize = '15px'
            this.$title.style.fontWeight = 600
            this.$title.innerHTML = `${title}:`

            this.$now = document.createElement('div')
            this.$now.className = 'fs-3 d-flex align-items-center'
            this.$now.style.fontWeight = 600

            this.$span = document.createElement('span')
            this.$span.innerHTML = this.isMoney ? `${formatNumber(today)} VND` : formatNumber(today)

            this.$arrowDown = document.createElement('i')

            this.$part = document.createElement('div')
            this.$part.className = 'opacity-50'
            this.$part.style.fontWeight = 600
            this.$part.style.fontSize = '13px'

            this.$part.innerHTML = `${desc}: ${this.isMoney ? `${formatNumber(part)} VND` : formatNumber(part)}`

        this.$infoBtn = document.createElement('i')
        this.$infoBtn.style.cursor = 'pointer'
        this.$infoBtn.className = 'bi bi-info-circle'
        if (today > part) {
            this.$now.classList.add('text-success')
            this.$arrowDown.className = 'bi bi-arrow-up fs-4'
        } else if (today < part) {
            this.$now.classList.add('text-danger')
            this.$arrowDown.className = 'bi bi-arrow-down fs-4'
        } else {
            this.$now.classList.add('text-primary')
            this.$arrowDown.className = 'd-none'
        }
    }
    render() {
        this.$container.appendChild(this.$info)
        this.$container.appendChild(this.$infoBtn)
        this.$info.appendChild(this.$title)
        this.$info.appendChild(this.$now)
        this.$info.appendChild(this.$part)
        this.$now.appendChild(this.$span)
        this.$now.appendChild(this.$arrowDown)
        return this.$container
    }
}
export default ReportCard