class FilterItem {
    constructor({ title, selectItem }) {
        this.$container = document.createElement('li')
        this.$container.className = 'dropdownItem list-group-item'
        this.$container.style.cursor = 'pointer'
        this.$container.innerHTML = title
        this.$container.addEventListener('click', () => {
            selectItem(title)
        })
    }
    render() {
        return this.$container
    }
}
export default FilterItem