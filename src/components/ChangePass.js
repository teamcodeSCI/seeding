import { updatePassword } from "../apis/user.js";
import { getPage } from "../util/getPage.js";
import { splitStr } from "../util/splitStr.js";
import InputGroup from "./InputGroup.js";

export default class ChangePass {
  constructor({ closeChangePass }) {
    this.closeChangePass = closeChangePass;
    this.$container = document.createElement("div");
    this.$container.className = `modal d-flex align-items-center justify-content-center`;
    this.$container.style.cssText = `background:rgba(0,0,0,0.5); z-index:100`;

    this.$dialog = document.createElement("div");
    this.$dialog.className = `modal-dialog`;
    this.$dialog.style.cssText = `max-width: 350px; width: 90%`;

    this.$content = document.createElement("div");
    this.$content.className = `modal-content`;

    this.$header = document.createElement("div");
    this.$header.className = `modal-header px-3 py-2`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = `Đổi mật khẩu`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      closeChangePass();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body d-flex flex-column p-3 gap-2`;

    this.$newPass = new InputGroup({
      placeholder: "Nhập mật khẩu mới...",
      type: "password"
    });
    this.$retypePass = new InputGroup({
      placeholder: "Nhập lại mật khẩu mới...",
      type: "password"
    });

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$submitBtn = document.createElement("button");
    this.$submitBtn.className = `btn btn-primary`;
    this.$submitBtn.innerHTML = `Đổi mật khẩu`;
    this.$submitBtn.addEventListener("click", () => {
      this.changePass();
    });
    this.$pendingBtn = document.createElement("button");
    this.$pendingBtn.className = "btn btn-secondary";
    this.$pendingBtn.innerHTML = "Vui lòng chờ ...";

    this.$noteBox = document.createElement("div");
    this.$note = document.createElement("p");
    this.$note.className = `text-center m-0`;
    this.$note.style.cssText = `color:red; font-style:italic;font-size:14px`;
  }
  pending = () => {
    this.$footer.innerHTML = "";
    this.$footer.appendChild(this.$pendingBtn);
  };
  unPending = () => {
    this.$footer.innerHTML = "";
    this.$footer.appendChild(this.$submitBtn);
  };
  showNote = (note) => {
    this.$note.innerHTML = "";
    this.$note.innerHTML = note;
    this.$noteBox.appendChild(this.$note);
  };

  changePass = async () => {
    this.pending();
    if (
      this.$newPass.getValue().value === "" ||
      this.$retypePass.getValue().value === ""
    ) {
      this.showNote("Vui lòng nhập đủ thông tin !");
      return;
    }
    if (this.$newPass.getValue().value !== this.$retypePass.getValue().value) {
      this.showNote("Mật khẩu không khớp!");
      this.unPending();
      return;
    }
    const update = await updatePassword({
      token: splitStr(localStorage.getItem("token")).token,
      password: this.$newPass.getValue().value
    });
    if (update.type !== 0) {
      this.showNote(update.message);
      this.unPending();
      return;
    }
    this.showNote("Đổi mật khẩu thành công !");

    setTimeout(() => {
      this.closeChangePass();
      localStorage.removeItem("token");
      getPage();
    }, 1500);
    this.unPending();
  };
  render() {
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);

    this.$content.appendChild(this.$header);
    this.$content.appendChild(this.$body);
    this.$content.appendChild(this.$footer);

    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);

    this.$body.appendChild(this.$newPass.render());
    this.$body.appendChild(this.$retypePass.render());
    this.$body.appendChild(this.$noteBox);

    this.$footer.appendChild(this.$submitBtn);
    return this.$container;
  }
}
