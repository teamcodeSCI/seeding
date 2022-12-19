import { menu } from "../util/const.js"
import MenuItem from "./MenuItem.js"

class Menu {
    constructor({ getLayout }) {
        this.getLayout = getLayout
        this.$container = document.createElement('div')
        this.$container.className = 'd-flex'
        this.$container.style.background = '#efefef'
    }
    render() {
        this.$container.innerHTML = ''
        for (let item of menu) {
            this.$tab = new MenuItem({ text: item.title, link: item.link, isActive: sessionStorage.getItem('link') === item.link ? true : false, getLayout: this.getLayout })
            this.$container.appendChild(this.$tab.render())
        }
        return this.$container
    }
}
export default Menu