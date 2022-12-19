import { tabCost } from "../../util/const.js"
import { getComponent } from "../../util/getComponent.js"
import Tabs from "../Tabs.js"

class ReportCost {
    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'report px-3 py-4 bg-white'

        this.$navCost = document.createElement('div')
        this.$navCost.className = 'costMenu mb-3'

        this.$box = document.createElement('div')
        this.$box.className = 'box'
    }
    getLayoutCost = () => {
        if (!sessionStorage.getItem('tabCost')) {
            sessionStorage.setItem('tabCost', '[cost] week')
        }
        this.$menuCost = new Tabs({ getLayout: this.getLayoutCost, tab: 'tabCost', tabs: tabCost })
        this.$navCost.innerHTML = ''
        this.$navCost.appendChild(this.$menuCost.render())
        getComponent(this.$box, tabCost, 'tabCost')
    }
    render() {

        this.$container.appendChild(this.$navCost)
        this.$container.appendChild(this.$box)
        this.getLayoutCost()
        return this.$container
    }
}
export default ReportCost