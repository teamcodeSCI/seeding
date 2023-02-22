import { tabLead } from "../../util/const.js"
import { getComponent } from "../../util/getComponent.js"

import Tabs from "../Tabs.js"

class ReportLB {
    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'report px-3 py-4 bg-white'

        this.$navLead = document.createElement('div')
        this.$navLead.className = 'menuLead mb-2'

        this.$leadContent = document.createElement('div')
        this.$leadContent.className = 'leadContent'
    }
    getLayout = () => {
        if (!sessionStorage.getItem('tabLB')) {
            sessionStorage.setItem('tabLB', '[LB] week')
        }
        this.$menuLead = new Tabs({ getLayout: this.getLayout, tab: 'tabLB', tabs: tabLead })
        this.$navLead.innerHTML = ''
        this.$navLead.appendChild(this.$menuLead.render())
        getComponent(this.$leadContent, tabLead, 'tabLB')
    }

    render() {

        this.$container.appendChild(this.$navLead)
        this.$container.appendChild(this.$leadContent)
        this.getLayout()

        return this.$container
    }
}
export default ReportLB