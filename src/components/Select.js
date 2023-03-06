import { activeUser } from "../apis/userList.js"
import SelectItem from "./SelectItem.js"

class Select {
    constructor({ data, select, codeUser, getAllUser }) {
        this.select = select
        this.data = data
        this.codeUser = codeUser
        this.getAllUser = getAllUser
        this.$select = document.createElement('select')
        this.$select.className = 'form-control w-auto fst-italic p-0 position-relative'
        this.$select.style.border = "1px solid transparent";
        this.$select.style.background = "transparent";
        this.$select.style.cursor = 'pointer'
        this.$select.value = select
        this.$select.addEventListener('change', () => {
            this.changeStatus()
        })
    }
    getValue = () => {
        return this.$select.value
    }
    changeStatus = async() => {
        await activeUser({ codeUser: this.codeUser, active: this.$select.value })
        this.getAllUser()
    }
    renderItem = () => {
        this.$select.innerHTML = ''
        this.data.forEach(e => {
            this.$option = new SelectItem({...e, select: this.select })
            this.$select.appendChild(this.$option.render())
        });
    }
    render() {
        this.renderItem()
        return this.$select
    }
}
export default Select