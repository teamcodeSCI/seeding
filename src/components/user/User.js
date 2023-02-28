class User {
    constructor() {
        this.$container = document.createElement('div')
        this.$container.className = 'report px-3 py-4 bg-white'
    }
    render() {
        return this.$container
    }
}
export default User