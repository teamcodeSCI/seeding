class UserItem {
    constructor({ userCode, name, birthday }) {
        this.$tr = document.createElement('div')
        this.$tr.className = 'row mx-0 p-2 position-relative'

        this.$userCode = document.createElement('div')
        this.$userCode.className = 'col text-truncate'
        this.$userCodeText = document.createElement('p')
        this.$userCodeText.className = 'm-0'
        this.$userCodeText.innerHTML = userCode

        this.$name = document.createElement('div')
        this.$name.className = 'col text-truncate'
        this.$nameText = document.createElement('p')
        this.$nameText.className = 'm-0'
        this.$nameText.innerHTML = name

        this.$birthday = document.createElement('div')
        this.$birthday.className = 'col text-truncate'
        this.$birthdayText = document.createElement('p')
        this.$birthdayText.className = 'm-0'
        this.$birthdayText.innerHTML = birthday
    }
    render() {
        this.$tr.appendChild(this.$userCode)
        this.$userCode.appendChild(this.$userCodeText)

        this.$tr.appendChild(this.$name)
        this.$name.appendChild(this.$nameText)

        this.$tr.appendChild(this.$birthday)
        this.$birthday.appendChild(this.$birthdayText)
        return this.$tr
    }
}
export default UserItem