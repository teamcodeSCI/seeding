import { fetchTarget } from "../../apis/target.js";
import { app } from "../../util/const.js";

import LeadDetailItem from "../lead/LeadDetailItem.js";
import AddTarget from "./AddTarget.js";

class TargetModal {
  constructor({ closeTargetModal, codeUser, name }) {
    this.codeUser = codeUser;
    this.$container = document.createElement("div");
    this.$container.className = `modal d-flex align-items-center justify-content-center`;
    this.$container.style.background = "rgba(0,0,0,0.7)";

    this.$dialog = document.createElement("div");
    this.$dialog.className = `modal-dialog`;
    this.$dialog.style.maxWidth = "600px";

    this.$dialog.style.width = "90%";

    this.$content = document.createElement("div");
    this.$content.className = `modal-content`;

    this.$header = document.createElement("div");
    this.$header.className = `modal-header px-3 py-2`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = name;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      closeTargetModal();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body d-flex flex-column`;
    this.$body.style.gap = "0.3rem";
    this.$body.style.maxHeight = "500px";
    this.$body.style.overflow = "auto";

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$addBtn = document.createElement("button");
    this.$addBtn.className = "btn btn-primary";
    this.$addBtn.innerHTML = "Thêm mới";
    this.$addBtn.addEventListener("click", () => {
      this.openTarget();
    });

    this.$note = document.createElement("p");
    this.$note.className = "m-0 text-center fst-italic";

    this.$addTarget = new AddTarget({
      codeUser: this.codeUser,
      closeTarget: this.closeTarget,
      getTarget: this.getTarget
    });
  }
  closeTarget = () => {
    app.removeChild(this.$addTarget.render());
  };
  openTarget = () => {
    app.appendChild(this.$addTarget.render());
  };
  getTarget = async () => {
    const target = await fetchTarget(this.codeUser);
    this.$body.innerHTML = "";
    this.$note.innerHTML = "";
    for (let i = 1; i < target.data.length; i++) {
      this.$targetItem = new LeadDetailItem({
        id: target.data[i].id,
        title: target.data[i].month,
        value: target.data[i].target,
        date: target.data[i].date,
        getTarget: this.getTarget,
        isUpdateTarget: true,
        codeUser: this.codeUser
      });

      this.$body.appendChild(this.$targetItem.render());
    }
    if (target.data.length === 1) {
      this.$note.innerHTML = "Không có dữ liệu";
      this.$body.appendChild(this.$note);
      return;
    }
  };
  render() {
    this.getTarget();
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);

    this.$content.appendChild(this.$header);
    this.$content.appendChild(this.$body);

    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);

    this.$content.appendChild(this.$footer);
    this.$footer.appendChild(this.$addBtn);
    return this.$container;
  }
}
export default TargetModal;
