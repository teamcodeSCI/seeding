import { fetchTarget } from "../../apis/target.js";
import UserItem from "./UserItem.js";

class UserList {
    constructor({ data, getAllUser }) {
        this.getAllUser = getAllUser;
        this.data = data;

        this.$container = document.createElement("div");
        this.$container.className = `table-responsive dataTable`;
        this.$container.style.fontSize = "15px";

        this.$theadTr = document.createElement("div");
        this.$theadTr.className =
            "row bg-light bg-gradient p-2 mx-0 flex-nowrap border-bottom";

        this.$numberCode = document.createElement("div");
        this.$numberCode.className = "col text-truncate";
        this.$numberCodeText = document.createElement("p");
        this.$numberCodeText.className = "m-0 fw-bold";
        this.$numberCodeText.innerHTML = `Mã nhân viên`;

        this.$name = document.createElement("div");
        this.$name.className = "col text-truncate";
        this.$nameText = document.createElement("p");
        this.$nameText.className = "m-0 fw-bold";
        this.$nameText.innerHTML = `Họ và tên`;

        this.$phonenumber = document.createElement("div");
        this.$phonenumber.className = "col text-truncate";
        this.$phonenumberText = document.createElement("p");
        this.$phonenumberText.className = "m-0 fw-bold";
        this.$phonenumberText.innerHTML = `Số điện thoại`;

        this.$targetNow = document.createElement("div");
        this.$targetNow.className = "col text-truncate";
        this.$targetNowText = document.createElement("p");
        this.$targetNowText.className = "m-0 fw-bold";
        this.$targetNowText.innerHTML = `Kết quả`;

        this.$target = document.createElement("div");
        this.$target.className = "col text-truncate";
        this.$targetText = document.createElement("p");
        this.$targetText.className = "m-0 fw-bold";
        this.$targetText.innerHTML = `Mục tiêu`;

        this.$progress = document.createElement("div");
        this.$progress.className = "col text-truncate";
        this.$progressText = document.createElement("p");
        this.$progressText.className = "m-0 fw-bold";
        this.$progressText.innerHTML = `Hoàn thành`;

        this.$status = document.createElement("div");
        this.$status.className = "col text-truncate";
        this.$statusText = document.createElement("p");
        this.$statusText.className = "m-0 fw-bold";
        this.$statusText.innerHTML = `Trạng thái`;

        this.$tbody = document.createElement("div");
        this.$tbody.className = "bg-item";
        this.$tbody.style.maxHeight = "650px";
        this.$tbody.style.overflowY = "auto";
        this.getAllUsers();
    }
    getAllUsers = () => {
        this.$tbody.innerHTML = "";
        for (let i = 1; i < this.data.length; i++) {
            this.$item = new UserItem({
                ...this.data[i],
                getAllUser: this.getAllUser
            });
            this.$tbody.appendChild(this.$item.render());
        }
        return this.$tbody;
    };

    render() {
        this.$container.appendChild(this.$theadTr);
        this.$container.appendChild(this.$tbody);

        this.$theadTr.appendChild(this.$numberCode);
        this.$numberCode.appendChild(this.$numberCodeText);

        this.$theadTr.appendChild(this.$name);
        this.$name.appendChild(this.$nameText);

        this.$theadTr.appendChild(this.$phonenumber);
        this.$phonenumber.appendChild(this.$phonenumberText);

        this.$theadTr.appendChild(this.$targetNow);
        this.$targetNow.appendChild(this.$targetNowText);

        this.$theadTr.appendChild(this.$target);
        this.$target.appendChild(this.$targetText);

        this.$theadTr.appendChild(this.$progress);
        this.$progress.appendChild(this.$progressText);

        this.$theadTr.appendChild(this.$status);
        this.$status.appendChild(this.$statusText);

        return this.$container;
    }
}
export default UserList;