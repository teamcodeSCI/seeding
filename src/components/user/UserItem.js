class UserItem {
    constructor({ userCode, name, birthday, phonenumber, status }) {
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

        this.$phonenumber = document.createElement('div')
        this.$phonenumber.className = 'col text-truncate'
        this.$phonenumberText = document.createElement('p')
        this.$phonenumberText.className = 'm-0'
        this.$phonenumberText.innerHTML = phonenumber

        this.$birthday = document.createElement('div')
        this.$birthday.className = 'col text-truncate'
        this.$birthdayText = document.createElement('p')
        this.$birthdayText.className = 'm-0'
        this.$birthdayText.innerHTML = birthday

        this.$status = document.createElement('div')
        this.$status.className = 'col text-truncate'
        this.$statusText = document.createElement('p')
        this.$statusText.className = 'm-0'
        this.$statusText.innerHTML = status

        this.$editBtn = document.createElement('button')
        this.$editBtn.className = 'position-absolute w-auto border-0 p-0 bg-transparent'
        this.$editBtn.style.right = '15px'
        this.$editIcon = document.createElement('i')
        this.$editIcon.className = 'bi bi-pencil text-primary'

    }
    render() {
        this.$tr.appendChild(this.$userCode)
        this.$userCode.appendChild(this.$userCodeText)

        this.$tr.appendChild(this.$name)
        this.$name.appendChild(this.$nameText)

        this.$tr.appendChild(this.$phonenumber)
        this.$phonenumber.appendChild(this.$phonenumberText)

        this.$tr.appendChild(this.$birthday)
        this.$birthday.appendChild(this.$birthdayText)

        this.$tr.appendChild(this.$status)
        this.$status.appendChild(this.$statusText)

        this.$tr.appendChild(this.$editBtn)
        this.$editBtn.appendChild(this.$editIcon)
        return this.$tr
    }
}
export default UserItem