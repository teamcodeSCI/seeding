import { getUser } from "../../apis/userList.js";
import SearchInput from "../SearchInput.js";
import UserList from "./userList.js";

class User {
    search = ''
    constructor() {
        this.$dataTable = document.createElement('div')
        this.$dataTable.className = `datatable px-3 py-4 bg-white`;

        this.$action = document.createElement('div')
        this.$action.className = 'd-flex justify-content-between align-items-center mb-3'

        this.$addBtn = document.createElement('button')
        this.$addBtn.className = 'addBtn btn btn-primary'
        this.$addBtn.innerHTML = 'Thêm mới'

        this.$search = new SearchInput({ placeholder: 'Tìm kiếm theo mã nhân viên ...', width: '20%', filterSearch: this.filterSearch })
        this.$content = document.createElement('div')
    }
    filterSearch = () => {
        this.search = this.$search.getValue()
        this.getAllUser()
    }
    getAllUser = async() => {
        this.$content.innerHTML = ''
        const users = await getUser({ userCode: this.search })
        this.$userList = new UserList({ data: users.data, getAllUser: this.getAllUser })
        this.$content.appendChild(this.$userList.render())
    }
    render() {
        this.getAllUser()
        this.$dataTable.appendChild(this.$action)
        this.$action.appendChild(this.$search.render())
        this.$action.appendChild(this.$addBtn)
        this.$dataTable.appendChild(this.$content)
        return this.$dataTable
    }
}
export default User