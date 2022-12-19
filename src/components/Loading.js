class Loading {
    constructor() {
        this.$bg = document.createElement('div')
        this.$bg.className = 'position-fixed top-0 bottom-0 start-0 w-100 d-flex align-items-center justify-content-center'
        this.$bg.style.zIndex = '2000'
        this.$bg.style.background = 'rgba(255,255,255,0.5)'

        this.$container = document.createElement('div')
        this.$container.className = 'spinner-border text-primary'
        this.$container.setAttribute('role', 'status')

        this.$span = document.createElement('span')
        this.$span.className = 'visually-hidden'
        this.$span.innerHTML = 'Loading...'
    }
    render() {
        this.$bg.appendChild(this.$container)
        this.$container.appendChild(this.$span)
        return this.$bg
    }
}
export default Loading