import SelectItem from "./SelectItem.js"

class Select {
    constructor({ data }) {
        this.data = data
        this.$select = document.createElement('select')
        this.$select.className = 'form-control w-100 fst-italic px-3 ps-2 pe-3 position-relative'
        this.$select.style.border = "1px solid transparent";
        this.$select.style.borderRadius = "4px";
        this.$select.style.fontSize = "14px";
        this.$select.style.background = "rgb(235 235 235)";
    }
    getValue = () => {
        return this.$select.value
    }
    renderItem = () => {
        this.$select.innerHTML = ''
        this.data.forEach(e => {
            this.$option = new SelectItem({ value: e })
            this.$select.appendChild(this.$option.render())
        });
    }
    render() {
        this.renderItem()
        return this.$select
    }
}
export default Select