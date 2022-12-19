import { tabLead } from "../../util/const.js"
import { getComponent } from "../../util/getComponent.js"
import ReportLead from "./ReportLead.js"
import Tabs from "../Tabs.js"

class ReportLB {
    data = {
        day: {
            today: 20,
            yesterday: 10
        },
        week: {
            currentWeek: 100,
            lastWeek: 150
        },
        month: {
            currentMonth: 400,
            lastMonth: 300
        },
        year: {
            currentYear: 10000,
            lastYear: 20000
        }

    }
    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'report px-3 py-4 bg-white'

        this.$box = document.createElement('div')
        this.$box.className = 'd-flex flex-column gap-3 mb-4'

        this.$reportLead = new ReportLead({ title: 'Số lượng lead:', data: this.data })
        this.$reportBooking = new ReportLead({ title: 'Số lượng booking:', data: this.data })

        this.$navLead = document.createElement('div')
        this.$navLead.className = 'menuLead mb-2'

        this.$leadContent = document.createElement('div')
        this.$leadContent.className = 'leadContent'
    }
    getLayoutLead = () => {
        if (!sessionStorage.getItem('tabLB')) {
            sessionStorage.setItem('tabLB', '[LB] week')
        }
        this.$menuLead = new Tabs({ getLayout: this.getLayoutLead, tab: 'tabLB', tabs: tabLead })
        this.$navLead.innerHTML = ''
        this.$navLead.appendChild(this.$menuLead.render())
        getComponent(this.$leadContent, tabLead, 'tabLB')
    }

    render() {
        this.$container.appendChild(this.$box)

        this.$box.appendChild(this.$reportLead.render())
        this.$box.appendChild(this.$reportBooking.render())

        this.$container.appendChild(this.$navLead)
        this.$container.appendChild(this.$leadContent)
        this.getLayoutLead()

        return this.$container
    }
}
export default ReportLB