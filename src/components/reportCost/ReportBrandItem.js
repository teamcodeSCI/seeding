class ReportBrandItem {
    constructor({ stt, name, lead, booking }) {
        this.$tr = document.createElement('tr')
        this.$tr.className = 'align-middle'

        this.$stt = document.createElement('td')
        this.$stt.innerHTML = stt

        this.$name = document.createElement('td')
        this.$name.innerHTML = name

        this.$revenue = document.createElement('td')
        this.$revenue.innerHTML = lead

        this.$deposits = document.createElement('td')
        this.$deposits.innerHTML = booking

        this.$owed = document.createElement('td')
        this.$owed.innerHTML = booking
    }
    render() {
        this.$tr.appendChild(this.$stt)
        this.$tr.appendChild(this.$name)
        this.$tr.appendChild(this.$revenue)
        this.$tr.appendChild(this.$deposits)
        this.$tr.appendChild(this.$owed)

        return this.$tr
    }
}
export default ReportBrandItem