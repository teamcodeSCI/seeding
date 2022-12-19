class Tag {
    constructor(tag) {
        this.$container = document.createElement('span')
        this.$container.className = 'badge bg-danger py-1 px-2'
        this.$container.style.borderRadius = '4px'
        this.$container.innerHTML = tag
    }
    render() {
        return this.$container
    }
}
export default Tag