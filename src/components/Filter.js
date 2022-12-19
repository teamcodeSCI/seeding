class Filter {
    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'border-bottom'
        this.$filterBtn = document.createElement('button')
        this.$filterBtn.className = 'dropdown-toggle bg-white px-2 py-1 border-0'
        this.$filterBtn.innerHTML = 'Thương hiệu'
        this.$filterBtn.style.fontSize = '14px'
    }
    render() {
        this.$container.appendChild(this.$filterBtn)
        return this.$container
    }
}
export default Filter