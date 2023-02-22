class MenuItem {
    constructor({ text, link, isActive, getLayout }) {
        this.getLayout = getLayout
        this.link = link
        this.$container = document.createElement('div')
        this.$container.className = `py-2 px-3 text-center ${isActive?'rounded-top':''}`
        this.$container.style.background = isActive ? '#fff' : ''
        this.$container.style.fontWeight = isActive ? '600' : ''
        this.$container.style.minWidth = '100px'
        this.$container.style.cursor = 'pointer'
        this.$container.innerHTML = text || ''
        this.$container.addEventListener('click', () => {
            this.clickMenu()
        })
    }
    clickMenu = () => {
        sessionStorage.setItem('link', this.link)
        this.getLayout()
    }
    render() {
        return this.$container
    }
}
export default MenuItem