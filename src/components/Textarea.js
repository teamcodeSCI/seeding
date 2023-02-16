class Textarea {
    constructor({ palaceHolder, value }) {
        this.$container = document.createElement('div')
        this.$container.className = 'input-group flex-column'

        this.$textarea = document.createElement('textarea')
        this.$textarea.className = 'form-control w-100 border-0 fst-italic px-3 py-2'
        this.$textarea.rows = 5
        this.$textarea.style.background = 'rgb(235 235 235)'
        this.$textarea.style.resize = 'none'
        this.$textarea.style.fontSize = '14px'
        this.$textarea.style.borderRadius = '4px'
        this.$textarea.value = value || ''
        this.$textarea.placeholder = palaceHolder
    }
    getValue = () => {
        return this.$textarea.value
    }
    setValue = (val) => {
        this.$textarea.value = val || ''
    }
    render() {
        this.$container.appendChild(this.$textarea)
        return this.$container
    }
}
export default Textarea