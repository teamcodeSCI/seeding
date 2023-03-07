import { updatePassUser } from '../../apis/userList.js';
import InputGroup from '../InputGroup.js'
class EditUserModal {

    constructor({ closeUserEditModal, user, getAllUser }) {
        this.getAllUser = getAllUser
        this.user = user
        this.closeUserEditModal = closeUserEditModal
        this.$container = document.createElement("div");
        this.$container.className = `modal d-flex align-items-center justify-content-center`;
        this.$container.style.background = "rgba(0,0,0,0.7)";

        this.$dialog = document.createElement("div");
        this.$dialog.className = `modal-dialog`;
        this.$dialog.style.maxWidth = "500px";
        this.$dialog.style.width = "90%";

        this.$content = document.createElement("div");
        this.$content.className = `modal-content`;

        this.$header = document.createElement("div");
        this.$header.className = `modal-header`;

        this.$title = document.createElement("h5");
        this.$title.className = `modal-title`;
        this.$title.innerHTML = `Sửa thông tin`;

        this.$notify = document.createElement('p')
        this.$notify.className = 'm-0 text-center fst-italic text-danger'
        this.$notify.style.fontSize = '14px'

        this.$body = document.createElement("div");
        this.$body.className = `modal-body p-4`;

        this.$border = document.createElement("div");
        this.$border.className = `bg-white d-flex justify-content-between gap-3 flex-column mb-2`;

        this.$password = new InputGroup({ placeholder: 'Nhập mật khẩu mới', type: 'password' })
        this.$retypePassword = new InputGroup({ placeholder: 'Nhập lại mật khẩu mới', type: 'password' })

        this.$footer = document.createElement("div");
        this.$footer.className = `modal-footer`;

        this.$saveBtn = document.createElement("button");
        this.$saveBtn.className = "btn btn-primary";
        this.$saveBtn.innerHTML = "Cập nhật";
        this.$saveBtn.addEventListener("click", () => {
            this.save()
        });
        this.$closeBtn = document.createElement("button");
        this.$closeBtn.className = `btn-close`;
        this.$closeBtn.addEventListener("click", () => {
            closeUserEditModal()
            this.$password.reset()
            this.$retypePassword.reset()
        });
    }
    save = async() => {
        if (this.$password.getValue().value === "" || this.$retypePassword.getValue().value === "") {
            this.$notify.innerHTML = 'Hãy nhập đầy đủ thông tin!'
            return;
        }
        if (this.$password.getValue().value !== this.$retypePassword.getValue().value) {
            this.$notify.innerHTML = 'Mật khẩu không khớp!'
            return;
        }
        this.$notify.innerHTML = ''
        const update = await updatePassUser({ user: this.user, password: this.$password.getValue().value })
        if (update.type !== 0) {
            this.$notify.innerHTML = update.message
            return
        }
        this.getAllUser()
        this.closeUserEditModal()

    }
    render() {
        this.$container.appendChild(this.$dialog);
        this.$dialog.appendChild(this.$content);
        this.$content.appendChild(this.$header);
        this.$header.appendChild(this.$title);
        this.$header.appendChild(this.$closeBtn);
        this.$content.appendChild(this.$body);
        this.$content.appendChild(this.$footer);
        this.$body.appendChild(this.$border);
        this.$body.appendChild(this.$notify);

        this.$border.appendChild(this.$password.render())
        this.$border.appendChild(this.$retypePassword.render())

        this.$footer.appendChild(this.$saveBtn);
        return this.$container;
    }
}
export default EditUserModal