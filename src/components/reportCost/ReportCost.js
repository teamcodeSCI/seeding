import { tabTarget } from "../../util/const.js"
import { getComponent } from "../../util/getComponent.js"
import Tabs from "../Tabs.js"

class ReportCost {
    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'report px-3 py-4 bg-white'

        this.$navCost = document.createElement('div')
        this.$navCost.className = 'costMenu mb-3'


        this.$contentTarget = document.createElement('div')
        this.$contentTarget.className = 'contentTarget mb-4'


    }
    getLayoutTarget = () => {
        if (!sessionStorage.getItem('tabTarget')) {
            sessionStorage.setItem('tabTarget', '[Target] day')
        }
        this.$menuTarget = new Tabs({ getLayout: this.getLayoutTarget, tab: 'tabTarget', tabs: tabTarget })
        this.$navCost.innerHTML = ''
        this.$navCost.appendChild(this.$menuTarget.render())
        getComponent(this.$contentTarget, tabTarget, 'tabTarget')
    }
    render() {
        this.$container.appendChild(this.$navCost)
        this.$container.appendChild(this.$contentTarget)
        this.getLayoutTarget()
        return this.$container
    }
}
export default ReportCost