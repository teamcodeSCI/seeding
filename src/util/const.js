import Booking from "../components/booking/Booking.js"
import Lead from "../components/lead/Lead.js"
import Report from "../components/report/Report.js"
import ReportLeadWeek from "../components/report/ReportLeadWeek.js"
import ReportLeadMonth from "../components/report/ReportLeadMonth.js"
import ReportLeadYear from "../components/report/ReportLeadYear.js"

export const app = document.getElementById('root')

const lead = new Lead()
const booking = new Booking()
const report = new Report()

const reportLeadWeek = new ReportLeadWeek()
const reportLeadMonth = new ReportLeadMonth()
const reportLeadYear = new ReportLeadYear()


export const menu = [
    { title: 'Lead', link: 'lead', component: lead },
    { title: 'Booking', link: 'booking', component: booking },
    { title: 'Báo cáo', link: 'report', component: report }
]
export const tabLead = [
    { title: 'Tuần', link: 'leadWeek', component: reportLeadWeek },
    { title: 'Tháng', link: 'leadMonth', component: reportLeadMonth },
    { title: 'Năm', link: 'leadYear', component: reportLeadYear }
]