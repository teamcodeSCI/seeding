import ReportCard from "../ReportCard.js"

class ReportLead {
    constructor({ title, data }) {
        this.data = data
        this.$container = document.createElement('div')
        this.$container.className = ''

        this.$title = document.createElement('div')
        this.$title.className = 'fs-6 fw-bold mb-2'
        this.$title.innerHTML = title

        this.$boxLead = document.createElement('div')
        this.$boxLead.className = 'd-flex align-items-center gap-3'

        this.$leadDay = new ReportCard({ title: 'Theo ngày', today: this.data.day.today, desc: 'Hôm qua', part: this.data.day.yesterday })
        this.$leadWeek = new ReportCard({ title: 'Theo tuần', today: this.data.week.currentWeek, desc: 'Tuần trước', part: this.data.week.lastWeek })
        this.$leadMonth = new ReportCard({ title: 'Theo tháng', today: this.data.month.currentMonth, desc: 'Tháng trước', part: this.data.month.lastMonth })
        this.$leadYear = new ReportCard({ title: 'Theo năm', today: this.data.year.currentYear, desc: 'Năm trước', part: this.data.year.lastYear })

    }
    render() {
        this.$container.appendChild(this.$title)
        this.$container.appendChild(this.$boxLead)
        this.$boxLead.appendChild(this.$leadDay.render())
        this.$boxLead.appendChild(this.$leadWeek.render())
        this.$boxLead.appendChild(this.$leadMonth.render())
        this.$boxLead.appendChild(this.$leadYear.render())

        return this.$container
    }
}
export default ReportLead