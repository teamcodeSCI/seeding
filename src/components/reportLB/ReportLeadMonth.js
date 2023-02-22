import ReportTable from "./ReportTable.js"

class ReportLeadMonth {
    labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
    dataSet = [{
        label: 'Lead',
        backgroundColor: '#1a73e8',
        borderColor: '#1a73e8',
        highlightFill: '#1a73e8',
        highlightStroke: '#1a73e8',
        data: [10, 20, 30, 40]
    }, {
        label: 'Booking',
        backgroundColor: 'red',
        borderColor: 'red',
        highlightFill: 'red',
        highlightStroke: 'red',
        data: [5, 15, 20, 30]
    }]
    branchData = [{
        name: 'Paris',
        lead: '50',
        booking: '40'
    }, {
        name: 'Kangnam',
        lead: '80',
        booking: '50'
    }, {
        name: 'Hồng Hà',
        lead: '20',
        booking: '8'
    }, {
        name: 'Đông Á',
        lead: '40',
        booking: '25'
    }]
    constructor() {
        this.$box = document.createElement('div')
        this.$box.className = 'd-flex gap-3 align-items-start'
        this.$chartBox = document.createElement('div')
        this.$chartBox.style.width = '65%'
        this.$tableBox = document.createElement('div')
        this.$tableBox.style.width = '35%'

        this.$serviceBookingRp = new ReportTable({ data: this.branchData })
    }
    render() {
        this.$box.appendChild(this.$chartBox)

        this.$box.appendChild(this.$tableBox)
        this.$tableBox.appendChild(this.$serviceBookingRp.render())
        return this.$box
    }
}
export default ReportLeadMonth