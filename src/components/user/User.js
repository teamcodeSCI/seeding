import { getUser } from "../../apis/userList.js";
import { app } from "../../util/const.js";

import SearchInput from "../SearchInput.js";
import AddUser from "./AddUser.js";
import UserList from "./UserList.js";

class User {
  search = "";
  constructor() {
    this.$dataTable = document.createElement("div");
    this.$dataTable.className = `datatable px-3 py-4 bg-white`;

    this.$action = document.createElement("div");
    this.$action.className =
      "d-flex justify-content-between align-items-center mb-3";

    this.$addBtn = new AddUser({ getAllUser: this.getAllUser });

    this.$search = new SearchInput({
      placeholder: "Tìm kiếm theo mã nhân viên ...",
      width: "20%",
      filterSearch: this.filterSearch
    });
    this.$content = document.createElement("div");
  }
  filterSearch = () => {
    this.search = this.$search.getValue();
    this.getAllUser();
  };
  getAllUser = async () => {
    this.$content.innerHTML = "";
    const users = await getUser({ userCode: this.search });
    this.$userList = new UserList({
      data: users.data,
      getAllUser: this.getAllUser
    });
    this.$content.appendChild(this.$userList.render());
  };
  render() {
    this.getAllUser();
    this.$dataTable.appendChild(this.$action);
    this.$action.appendChild(this.$search.render());
    this.$action.appendChild(this.$addBtn.render());
    this.$dataTable.appendChild(this.$content);
    return this.$dataTable;
  }
}
export default User;
