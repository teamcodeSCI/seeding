class BookingDetailItem {
    constructor({ title, value }) {
        this.$container = document.createElement('p')
        this.$container.className = 'd-flex m-0 gap-2'
        this.$container.style.fontSize = '14px'

        this.$title = document.createElement('b')
        this.$title.className = 'col-6'
        this.$title.style.fontWeight = '600'
        this.$title.innerHTML = `${title}: `

        this.$value = document.createElement('span')
        this.$value.className = 'col-6'
        this.$value.innerHTML = value
    }
    render() {
        this.$container.appendChild(this.$title)
        this.$container.appendChild(this.$value)
        return this.$container
    }
}
export default BookingDetailItem