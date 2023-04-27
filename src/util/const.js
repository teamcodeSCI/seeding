import Booking from "../components/booking/Booking.js";
import Lead from "../components/lead/Lead.js";
import ReportLB from "../components/reportLB/ReportLB.js";
import ReportLeadWeek from "../components/reportLB/ReportLeadWeek.js";
import ReportLeadMonth from "../components/reportLB/ReportLeadMonth.js";
import ReportLeadYear from "../components/reportLB/ReportLeadYear.js";
import ReportCost from "../components/reportCost/ReportCost.js";
import ReportSuccessWeek from "../components/reportLB/ReportSuccessWeek.js";
import ReportSuccessYear from "../components/reportLB/ReportSuccessYear.js";
import ReportSuccessMonth from "../components/reportLB/ReportSuccessMonth.js";
import TargetDay from "../components/reportCost/TargetDay.js";
import TargetMonth from "../components/reportCost/TargetMonth.js";
import TargetYear from "../components/reportCost/TargetYear.js";
import { splitStr } from "./splitStr.js";
import User from "../components/user/User.js";
import ReportLeadRange from "../components/reportLB/ReportLeadRange.js";
import ReportSuccessRange from "../components/reportLB/ReportSuccessRange.js";

export const app = document.getElementById("root");
export const BASE_URL = "https://scigroup.com.vn/cp/seeding/api";
export const groupService =
  "PR000003, PRP00002, PR000005, PR000006, PR000007, PRP00004, PRP00006, PRP00007, DAP00010, DAP00007, DAP00014, DAP00005, DAP00017, DAP00015, DAP00011, DAP00012, DAPL0002, DAPL0003, DAP00008, KNP00001, KNP00002, KNP00003, KNP00004, KNP00005, KNP00006, KNP00007, KNP00008, KNP00009, KNP00010, KNP00011, KNP00013, KNPL0027, HP011, HP013, HP002, HP014, HP005, HP007, HP012, HP018, HP008, HP030, HP031, HP032, KN00S046, PRP00005";

const lead = new Lead();
const booking = new Booking();
const reportLB = new ReportLB();
const cost = new ReportCost();
const user = new User();

const reportLeadWeek = new ReportLeadWeek();
const reportLeadMonth = new ReportLeadMonth();
const reportLeadYear = new ReportLeadYear();
const reportLeadRange = new ReportLeadRange();

const reportSuccessWeek = new ReportSuccessWeek();
const reportSuccessMonth = new ReportSuccessMonth();
const reportSuccessYear = new ReportSuccessYear();
const reportSuccessRange = new ReportSuccessRange();

const targetDay = new TargetDay();
const targetMonth = new TargetMonth();
const targetYear = new TargetYear();

export const role = localStorage.getItem("token")
  ? splitStr(localStorage.getItem("token")).rule
  : "";

export const menu =
  role === "admin"
    ? [
        { title: "Lead", link: "lead", component: lead },
        { title: "Booking", link: "booking", component: booking },
        {
          title: "Báo cáo số lượng",
          link: "[report] lead-booking",
          component: reportLB
        },
        { title: "Báo cáo Chi phí", link: "[report] cost", component: cost },
        { title: "Nhân viên", link: "[report] user", component: user }
      ]
    : [
        { title: "Lead", link: "lead", component: lead },
        { title: "Booking", link: "booking", component: booking },
        {
          title: "Báo cáo số lượng",
          link: "[report] lead-booking",
          component: reportLB
        },
        { title: "Báo cáo Chi phí", link: "[report] cost", component: cost }
      ];
export const tabLead = [
  { title: "Tuần", link: "[LB] day", component: reportLeadWeek },
  { title: "Tháng", link: "[LB] month", component: reportLeadMonth },
  { title: "Năm", link: "[LB] year", component: reportLeadYear },
  { title: "Khoảng ngày", link: "[LB] rangeDate", component: reportLeadRange }
];

export const tabSuccess = [
  { title: "Tuần", link: "[Success] day", component: reportSuccessWeek },
  { title: "Tháng", link: "[Success] month", component: reportSuccessMonth },
  { title: "Năm", link: "[Success] year", component: reportSuccessYear },
  {
    title: "Khoảng ngày",
    link: "[Success] rangeDate",
    component: reportSuccessRange
  }
];
export const tabTarget = [
  { title: "Tuần", link: "[Target] day", component: targetDay },
  { title: "Tháng", link: "[Target] month", component: targetMonth },
  { title: "Năm", link: "[Target] year", component: targetYear }
];
