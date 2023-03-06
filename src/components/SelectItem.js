class SelectItem {
    constructor({ value, text, select }) {
        this.$option = document.createElement('option')
        this.$option.value = value
        this.$option.innerHTML = text
        this.$option.selected = select

    }
    render() {
        return this.$option
    }
}
export default SelectItem