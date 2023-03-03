class SelectItem {
    constructor({ value }) {
        this.$option = document.createElement('option')
        this.$option.value = value
        this.$option.innerHTML = value
    }
    render() {
        return this.$option
    }
}
export default SelectItem