class TabItem {
    constructor({ title, link, isActive, getLayout, tab }) {
        this.tab = tab
        this.getLayout = getLayout
        this.link = link
        this.$container = document.createElement('div')
        this.$container.className = `p-1 ${isActive?'border-bottom border-1 border-dark':''}`
        this.$container.innerHTML = title
        this.$container.style.cursor = 'pointer'
        this.$container.style.fontWeight = '600'
        this.$container.addEventListener('click', () => {
            this.clickMenu()
        })
    }
    clickMenu = () => {
        sessionStorage.setItem(this.tab, this.link)
        this.getLayout()
    }
    render() {
        return this.$container
    }
}
export default TabItem