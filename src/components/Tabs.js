import TabItem from "./TabItem.js"
class Tabs {
    constructor({ getLayout, tab, tabs }) {
        this.tabs = tabs
        this.tab = tab
        this.getLayout = getLayout
        this.$container = document.createElement('div')
        this.$container.className = 'd-flex mb-2 gap-2'
    }
    render() {
        this.$container.innerHTML = ''
        this.tabs.forEach((item) => {
            this.$tabItem = new TabItem({ link: item.link, title: item.title, isActive: sessionStorage.getItem(this.tab) === item.link ? true : false, getLayout: this.getLayout, tab: this.tab })
            this.$container.appendChild(this.$tabItem.render())
        })

        return this.$container
    }
}
export default Tabs