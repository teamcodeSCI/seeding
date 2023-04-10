import { app } from "../../util/const.js";
import AddUserModal from "./AddUserModal.js";

class AddUser {
  constructor({ getAllUser }) {
    this.$container = document.createElement("div");
    this.$btnAddUser = document.createElement("button");
    this.$btnAddUser.className = `btn btn-primary d-flex gap-2 justify-content-between w-100`;
    this.$btnAddUser.addEventListener("click", () => {
      this.openUserAddModal();
    });
    this.$icon = document.createElement("i");
    this.$icon.className = `bi bi-plus-lg`;

    this.$text = document.createElement("span");
    this.$text.innerHTML = "Thêm mới";

    this.$modalAdd = new AddUserModal({
      closeUserAddModal: this.closeUserAddModal,
      getAllUser: getAllUser
    });
  }

  openUserAddModal = () => {
    app.appendChild(this.$modalAdd.render());
  };
  closeUserAddModal = () => {
    app.removeChild(this.$modalAdd.render());
  };
  render() {
    this.$container.appendChild(this.$btnAddUser);
    this.$btnAddUser.appendChild(this.$text);
    this.$btnAddUser.appendChild(this.$icon);
    return this.$container;
  }
}
export default AddUser;
