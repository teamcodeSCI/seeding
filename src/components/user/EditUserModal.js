import InputGroup from '../InputGroup.js'
import Select from '../Select.js';
class EditUserModal {
    select = ['active', 'unactive']
    constructor({ closeUserEditModal }) {
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

        this.$closeBtn = document.createElement("button");
        this.$closeBtn.className = `btn-close`;
        this.$closeBtn.addEventListener("click", () => {
            closeUserEditModal()
        });

        this.$body = document.createElement("div");
        this.$body.className = `modal-body p-4`;

        this.$border = document.createElement("div");
        this.$border.className = `bg-white d-flex justify-content-between flex-wrap gap-3`;


        this.$password = new InputGroup({ placeholder: 'Nhập mật khẩu mới', type: 'password' })
        this.$retypePassword = new InputGroup({ placeholder: 'Nhập lại mật khẩu mới', type: 'password' })

        this.$active = new Select({ data: this.select })

        this.$footer = document.createElement("div");
        this.$footer.className = `modal-footer`;

        this.$saveBtn = document.createElement("button");
        this.$saveBtn.className = "btn btn-primary";
        this.$saveBtn.innerHTML = "Cập nhật";
        this.$saveBtn.addEventListener("click", () => {
            this.save()
        });
    }
    save = () => {
        if (
            this.$password.getValue().value === "" ||
            this.$retypePassword.getValue().value === ""
        ) {
            this.$password.fail()
            this.$retypePassword.fail()
            return;
        }
    }
    render() {
        this.$container.appendChild(this.$dialog);
        this.$dialog.appendChild(this.$content);
        this.$content.appendChild(this.$header);
        this.$header.appendChild(this.$title);
        this.$header.appendChild(this.$closeBtn);
        this.$content.appendChild(this.$body);
        this.$body.appendChild(this.$border);

        this.$border.appendChild(this.$password.render())
        this.$border.appendChild(this.$retypePassword.render())
        this.$border.appendChild(this.$active.render())

        this.$content.appendChild(this.$footer);
        this.$footer.appendChild(this.$saveBtn);
        return this.$container;
    }
}
export default EditUserModal