import { createUser } from '../../apis/userList.js';
import InputGroup from '../InputGroup.js'
class AddUserModal {
    constructor({ closeUserAddModal, getAllUser }) {
        this.getAllUser = getAllUser
        this.closeUserAddModal = closeUserAddModal
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
        this.$title.innerHTML = `Thêm thông tin`;

        this.$closeBtn = document.createElement("button");
        this.$closeBtn.className = `btn-close`;
        this.$closeBtn.addEventListener("click", () => {
            closeUserAddModal()
        });

        this.$body = document.createElement("div");
        this.$body.className = `modal-body p-4`;

        this.$border = document.createElement("div");
        this.$border.className = `bg-white d-flex justify-content-between flex-wrap gap-3`;

        this.$notify = document.createElement('p')
        this.$notify.className = 'm-0 text-center fst-italic text-danger'
        this.$notify.style.fontSize = '14px'

        this.$name = new InputGroup({ placeholder: 'Họ tên' })
        this.$phonenumber1 = new InputGroup({ placeholder: 'Số điện thoại 1' })
        this.$phonenumber2 = new InputGroup({ placeholder: 'Số điện thoại 2' })
        this.$birthday = new InputGroup({ placeholder: 'Ngày sinh', type: 'date' })


        this.$footer = document.createElement("div");
        this.$footer.className = `modal-footer`;

        this.$saveBtn = document.createElement("button");
        this.$saveBtn.className = "btn btn-primary";
        this.$saveBtn.innerHTML = "Thêm mới";
        this.$saveBtn.addEventListener("click", () => {
            this.save()
        });
    }
    save = async() => {
        if (
            this.$name.getValue().value === "" ||
            this.$phonenumber1.getValue().value === "" ||
            this.$birthday.getValue().value === ""
        ) {
            this.$notify.innerHTML = 'Vui lòng nhập đủ thông tin'
            return;
        }
        await createUser({
            name: this.$name.getValue().value,
            phone: this.$phonenumber1.getValue().value,
            mobile: this.$phonenumber2.getValue().value,
            birth: this.$birthday.getValue().value
        })
        this.closeUserAddModal()
        this.getAllUser()
    }
    render() {
        this.$container.appendChild(this.$dialog);
        this.$dialog.appendChild(this.$content);
        this.$content.appendChild(this.$header);
        this.$header.appendChild(this.$title);
        this.$header.appendChild(this.$closeBtn);

        this.$content.appendChild(this.$body);

        this.$body.appendChild(this.$border);
        this.$body.appendChild(this.$notify);

        this.$border.appendChild(this.$name.render())
        this.$border.appendChild(this.$phonenumber1.render())
        this.$border.appendChild(this.$phonenumber2.render())
        this.$border.appendChild(this.$birthday.render())

        this.$content.appendChild(this.$footer);
        this.$footer.appendChild(this.$saveBtn);
        return this.$container;
    }
}
export default AddUserModal