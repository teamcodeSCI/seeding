import { app } from "../../util/const.js";
import { formatNumber } from "../../util/util.js";
import Select from "../Select.js";
import EditUserModal from "./EditUserModal.js";
import TargetModal from "../target/TargetModal.js";
class UserItem {
    constructor({
        getAllUser,
        code_user,
        name,
        phone,
        active_user,
        kpi_target,
        kpi_now
    }) {
        this.targetNow = kpi_now === undefined ? "Vô hiệu hóa" : `${formatNumber(kpi_now)} Đ`;
        this.kpiTarget = kpi_target === undefined ? "Vô hiệu hóa" : `${formatNumber(kpi_target)} Đ`;
        this.progress = kpi_now === undefined || kpi_target === undefined ? 'Vô hiệu hóa' : `${(kpi_now * 100 / kpi_target).toFixed(1)}%`
        this.data = [
            { value: false, text: "Vô hiệu hóa" },
            { value: true, text: "Đang hoạt động" }
        ];
        this.getAllUser = getAllUser;
        this.$tr = document.createElement("div");
        this.$tr.className = "row mx-0 p-2 position-relative";
        this.$tr.style.opacity = active_user ? "1" : "0.7";

        this.$userCode = document.createElement("div");
        this.$userCode.className = "col text-truncate";
        this.$userCodeText = document.createElement("p");
        this.$userCodeText.className = "m-0";
        this.$userCodeText.innerHTML = code_user;

        this.$name = document.createElement("div");
        this.$name.className = "col text-truncate";
        this.$nameText = document.createElement("p");
        this.$nameText.className = "m-0";
        this.$nameText.innerHTML = name;

        this.$phonenumber = document.createElement("div");
        this.$phonenumber.className = "col text-truncate";
        this.$phonenumberText = document.createElement("p");
        this.$phonenumberText.className = "m-0";
        this.$phonenumberText.innerHTML = phone;

        this.$targetNow = document.createElement("div");
        this.$targetNow.className = "col text-truncate";
        this.$targetNowText = document.createElement("p");
        this.$targetNowText.className = "m-0";
        this.$targetNowText.innerHTML = this.targetNow


        this.$target = document.createElement("div");
        this.$target.className = "col text-truncate";
        this.$targetText = document.createElement("p");
        this.$targetText.className = "m-0";
        this.$targetText.innerHTML = this.kpiTarget


        this.$progress = document.createElement("div");
        this.$progress.className = "col text-truncate";
        this.$progressText = document.createElement("p");
        this.$progressText.className = "m-0";
        this.$progressText.innerHTML = this.progress

        this.$status = document.createElement("div");
        this.$status.className = "col text-truncate";
        this.$statusText = new Select({
            data: this.data,
            select: active_user,
            getAllUser: this.getAllUser,
            codeUser: code_user
        });
        this.$statusText.className = "m-0";
        this.$editUserModal = new EditUserModal({
            closeUserEditModal: this.closeModal,
            data: ""
        });

        this.$targetModal = new TargetModal({
            closeTargetModal: this.closeTargetModal,
            codeUser: code_user,
            name: name
        });

        this.$passwordBtn = document.createElement("button");
        this.$passwordBtn.className =
            "position-absolute w-auto border-0 p-0 bg-transparent";
        this.$passwordBtn.style.right = "30px";

        this.$passwordIcon = document.createElement("i");
        this.$passwordIcon.className = "bi bi-pencil text-primary";

        this.$passwordBtn.addEventListener("click", () => {
            app.appendChild(this.$editUserModal.render());
        });

        this.$targetBtn = document.createElement("button");
        this.$targetBtn.className =
            "position-absolute w-auto border-0 p-0 bg-transparent";
        this.$targetBtn.style.right = "5px";
        this.$targetIcon = document.createElement("i");
        this.$targetIcon.className = "bi bi-three-dots-vertical ";
        this.$targetBtn.addEventListener("click", () => {
            this.openTargetModal();
        });
    }
    closeModal = () => {
        app.removeChild(this.$editUserModal.render());
    };
    openModal = () => {
        app.appendChild(this.$editUserModal.render());
    };
    closeTargetModal = () => {
        app.removeChild(this.$targetModal.render());
    };
    openTargetModal = () => {
        app.appendChild(this.$targetModal.render());
    };
    render() {
        this.$tr.appendChild(this.$userCode);
        this.$userCode.appendChild(this.$userCodeText);

        this.$tr.appendChild(this.$name);
        this.$name.appendChild(this.$nameText);

        this.$tr.appendChild(this.$phonenumber);
        this.$phonenumber.appendChild(this.$phonenumberText);

        this.$tr.appendChild(this.$targetNow);
        this.$targetNow.appendChild(this.$targetNowText);

        this.$tr.appendChild(this.$target);
        this.$target.appendChild(this.$targetText);

        this.$tr.appendChild(this.$progress);
        this.$progress.appendChild(this.$progressText);

        this.$tr.appendChild(this.$status);
        this.$status.appendChild(this.$statusText.render());

        this.$tr.appendChild(this.$passwordBtn);
        this.$passwordBtn.appendChild(this.$passwordIcon);

        this.$tr.appendChild(this.$targetBtn);
        this.$targetBtn.appendChild(this.$targetIcon);
        return this.$tr;
    }
}
export default UserItem;