import Booking from "../components/booking/Booking.js"
import Lead from "../components/lead/Lead.js.js.js.js.js"
import ReportLB from "../components/reportLB/ReportLB.js"
import ReportLeadWeek from "../components/reportLB/ReportLeadWeek.js"
import ReportLeadMonth from "../components/reportLB/ReportLeadMonth.js"
import ReportLeadYear from "../components/reportLB/ReportLeadYear.js"
import ReportCost from "../components/reportCost/ReportCost.js"
import ReportCostWeek from "../components/reportCost/ReportCostWeek.js"
import ReportCostMonth from "../components/reportCost/ReportCostMonth.js"
import ReportCostYear from "../components/reportCost/ReportCostYear.js"


const lead = new Lead()
const booking = new Booking()
const reportLB = new ReportLB()
const cost = new ReportCost()

const reportLeadWeek = new ReportLeadWeek()
const reportLeadMonth = new ReportLeadMonth()
const reportLeadYear = new ReportLeadYear()

const reportCostWeek = new ReportCostWeek()
const reportCostMonth = new ReportCostMonth()
const reportCostYear = new ReportCostYear()

export const app = document.getElementById('root')

export const menu = [
    { title: 'Lead', link: 'lead', component: lead },
    { title: 'Booking', link: 'booking', component: booking },
    { title: 'Lead và Booking', link: '[report] lead-booking', component: reportLB },
    { title: 'Chi phí', link: '[report] cost', component: cost }
]
export const tabLead = [
    { title: 'Tuần', link: '[LB] week', component: reportLeadWeek },
    { title: 'Tháng', link: '[LB] month', component: reportLeadMonth },
    { title: 'Năm', link: '[LB] year', component: reportLeadYear }
]
export const tabCost = [
    { title: 'Tuần', link: '[cost] week', component: reportCostWeek },
    { title: 'Tháng', link: '[cost] month', component: reportCostMonth },
    { title: 'Năm', link: '[cost] year', component: reportCostYear }
]