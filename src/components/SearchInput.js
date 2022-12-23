class SearchInput {
    constructor({ type, placeholder, value, width }) {
        this.$container = document.createElement('div')
        this.$container.className = 'position-relative'
        this.$container.style.borderBottom = '1px solid #dee2e6'
        this.$container.style.width = width || '100%'
        this.$container.style.minWidth = '200px'

        this.$input = document.createElement('input')
        this.$input.className = 'w-100 fst-italic ps-1 pe-4 py-1'
        this.$input.style.outline = 'none'
        this.$input.style.border = 'none'
        this.$input.style.fontSize = '14px'
        this.$input.type = type || 'text'
        this.$input.placeholder = placeholder || ''
        this.$input.value = value || ''
        this.$icon = document.createElement('i')
        this.$icon.className = 'bi bi-search position-absolute'
        this.$icon.style.fontSize = '14px'
        this.$icon.style.right = '5px'
        this.$icon.style.top = '50%'
        this.$icon.style.transform = 'translateY(-50%)'
        this.$icon.style.cursor = 'pointer'
        this.$icon.style.zIndex = '10'

        window.onload = () => {
            this.$input.focus();
        }
    }
    getValue = () => {
        return this.$input.value
    }
    setValue = (val) => {
        this.$input.value = val || ''
    }
    render() {
        this.$container.appendChild(this.$input)
        this.$container.appendChild(this.$icon)
        return this.$container
    }
}
export default SearchInput