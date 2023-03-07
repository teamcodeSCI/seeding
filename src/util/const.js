import Booking from "../components/booking/Booking.js"
import Lead from "../components/lead/Lead.js"
import ReportLB from "../components/reportLB/ReportLB.js"
import ReportLeadWeek from "../components/reportLB/ReportLeadWeek.js"
import ReportLeadMonth from "../components/reportLB/ReportLeadMonth.js"
import ReportLeadYear from "../components/reportLB/ReportLeadYear.js"
import ReportCost from "../components/reportCost/ReportCost.js"
import ReportSuccessWeek from "../components/reportLB/ReportSuccessWeek.js"
import ReportSuccessYear from "../components/reportLB/ReportSuccessYear.js"
import ReportSuccessMonth from "../components/reportLB/ReportSuccessMonth.js"
import TargetDay from "../components/reportCost/TargetDay.js"
import TargetMonth from "../components/reportCost/TargetMonth.js"
import TargetYear from "../components/reportCost/TargetYear.js"
import { splitStr } from "./splitStr.js"
import User from "../components/user/User.js"

export const app = document.getElementById('root')

const lead = new Lead()
const booking = new Booking()
const reportLB = new ReportLB()
const cost = new ReportCost()
const user = new User()

const reportLeadWeek = new ReportLeadWeek()
const reportLeadMonth = new ReportLeadMonth()
const reportLeadYear = new ReportLeadYear()

const reportSuccessWeek = new ReportSuccessWeek()
const reportSuccessMonth = new ReportSuccessMonth()
const reportSuccessYear = new ReportSuccessYear()

const targetDay = new TargetDay()
const targetMonth = new TargetMonth()
const targetYear = new TargetYear()



export const role = localStorage.getItem('token') ? splitStr(localStorage.getItem('token')).rule : ''

export const menu = role === 'admin' ? [
    { title: 'Lead', link: 'lead', component: lead },
    { title: 'Booking', link: 'booking', component: booking },
    { title: 'Báo cáo số lượng', link: '[report] lead-booking', component: reportLB },
    { title: 'Báo cáo Chi phí', link: '[report] cost', component: cost },
    { title: 'Quản lý nhân viên', link: '[report] user', component: user }
] : [
    { title: 'Lead', link: 'lead', component: lead },
    { title: 'Booking', link: 'booking', component: booking },
    { title: 'Báo cáo số lượng', link: '[report] lead-booking', component: reportLB },
    { title: 'Báo cáo Chi phí', link: '[report] cost', component: cost }

]
export const tabLead = [
    { title: 'Ngày', link: '[LB] day', component: reportLeadWeek },
    { title: 'Tháng', link: '[LB] month', component: reportLeadMonth },
    { title: 'Năm', link: '[LB] year', component: reportLeadYear }
]

export const tabSuccess = [
    { title: 'Ngày', link: '[Success] day', component: reportSuccessWeek },
    { title: 'Tháng', link: '[Success] month', component: reportSuccessMonth },
    { title: 'Năm', link: '[Success] year', component: reportSuccessYear }
]
export const tabTarget = [
    { title: 'Ngày', link: '[Target] day', component: targetDay },
    { title: 'Tháng', link: '[Target] month', component: targetMonth },
    { title: 'Năm', link: '[Target] year', component: targetYear }
]