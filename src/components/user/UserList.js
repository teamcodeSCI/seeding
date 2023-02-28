import UserItem from "./UserItem.js"

class UserList {
    constructor({ data, getAllUser }) {
        this.getAllUser = getAllUser
        this.data = data
        this.$container = document.createElement('div')
        this.$container.className = `table-responsive dataTable`

        this.$theadTr = document.createElement('div')
        this.$theadTr.className = 'row bg-light bg-gradient p-2 mx-0 flex-nowrap border-bottom'

        this.$numberCode = document.createElement('div')
        this.$numberCode.className = 'col text-truncate'
        this.$numberCodeText = document.createElement('p')
        this.$numberCodeText.className = 'm-0 fw-bold'
        this.$numberCodeText.innerHTML = `Mã nhân viên`

        this.$name = document.createElement('div')
        this.$name.className = 'col text-truncate'
        this.$nameText = document.createElement('p')
        this.$nameText.className = 'm-0 fw-bold'
        this.$nameText.innerHTML = `Họ và tên`

        this.$birthday = document.createElement('div')
        this.$birthday.className = 'col text-truncate'
        this.$birthdayText = document.createElement('p')
        this.$birthdayText.className = 'm-0 fw-bold'
        this.$birthdayText.innerHTML = `Ngày sinh`

        this.$tbody = document.createElement('div')
        this.$tbody.className = 'bg-item'
        this.getAllUsers()
    }
    getAllUsers = () => {
        this.$tbody.innerHTML = ''
        for (let i = 0; i < this.data.length; i++) {
            this.$item = new UserItem({
                ...this.data[i],
                getAllUser: this.getAllUser
            })
            this.$tbody.appendChild(this.$item.render())
        }
        return this.$tbody
    }

    render() {
        this.$container.appendChild(this.$theadTr)
        this.$container.appendChild(this.$tbody)

        this.$theadTr.appendChild(this.$numberCode)
        this.$numberCode.appendChild(this.$numberCodeText)

        this.$theadTr.appendChild(this.$name)
        this.$name.appendChild(this.$nameText)

        this.$theadTr.appendChild(this.$birthday)
        this.$birthday.appendChild(this.$birthdayText)

        return this.$container
    }
}
export default UserList