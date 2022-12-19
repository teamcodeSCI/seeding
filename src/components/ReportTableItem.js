class ReportTableItem {
    constructor({ stt, name, lead, booking }) {
        this.$tr = document.createElement('tr')
        this.$tr.className = 'align-middle'

        this.$stt = document.createElement('td')
        this.$stt.innerHTML = stt

        this.$name = document.createElement('td')
        this.$name.innerHTML = name

        this.$lead = document.createElement('td')
        this.$lead.innerHTML = lead

        this.$booking = document.createElement('td')
        this.$booking.innerHTML = booking
    }
    render() {
        this.$tr.appendChild(this.$stt)
        this.$tr.appendChild(this.$name)
        this.$tr.appendChild(this.$lead)
        this.$tr.appendChild(this.$booking)
        return this.$tr
    }
}
export default ReportTableItem