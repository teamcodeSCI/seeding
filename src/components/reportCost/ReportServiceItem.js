import { formatNumber } from "../../util/util.js"

class ReportServiceItem {
    constructor({ name, revenue, brand, deposits, owed }) {
        this.$tr = document.createElement('tr')
        this.$tr.className = 'align-middle'

        this.$name = document.createElement('td')
        this.$name.innerHTML = name

        this.$brand = document.createElement('td')
        this.$brand.innerHTML = brand

        this.$revenue = document.createElement('td')
        this.$revenue.innerHTML = `${formatNumber(revenue)} đ`

        this.$deposits = document.createElement('td')
        this.$deposits.innerHTML = `${formatNumber(deposits)} đ`

        this.$owed = document.createElement('td')
        this.$owed.innerHTML = `${formatNumber(owed)} đ`
    }
    render() {

        this.$tr.appendChild(this.$name)
        this.$tr.appendChild(this.$brand)

        this.$tr.appendChild(this.$revenue)
        this.$tr.appendChild(this.$deposits)
        this.$tr.appendChild(this.$owed)

        return this.$tr
    }
}
export default ReportServiceItem