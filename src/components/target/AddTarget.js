import { addNewTarget } from "../../apis/target.js";

import InputGroup from "../InputGroup.js";
import PendingBtn from "../PendingBtn.js";

class AddTarget {
  constructor({ closeTarget, getTarget, codeUser }) {
    this.codeUser = codeUser;
    this.getTarget = getTarget;
    this.closeTarget = closeTarget;
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
    this.$header.className = `modal-header px-3 py-2`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = `Thêm thông tin`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      this.resetInput();
      closeTarget();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body px-4 py-3`;

    this.$border = document.createElement("div");
    this.$border.className = `bg-white d-flex justify-content-between flex-wrap gap-2`;

    this.$notify = document.createElement("p");
    this.$notify.className = "m-0 text-center fst-italic text-danger";
    this.$notify.style.fontSize = "14px";

    this.$target = new InputGroup({ placeholder: "Mục tiêu" });
    this.$date = new InputGroup({ placeholder: "Tháng", type: "date" });

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$saveBtn = document.createElement("button");
    this.$saveBtn.className = "btn btn-primary";
    this.$saveBtn.innerHTML = "Thêm mới";
    this.$saveBtn.addEventListener("click", () => {
      this.saveTarget();
    });
    this.$pendingBtn = new PendingBtn(this.$footer, this.$saveBtn);
  }
  saveTarget = async () => {
    if (
      this.$target.getValue().value === "" ||
      this.$date.getValue().value === ""
    ) {
      this.$notify.innerHTML = "Vui lòng nhập đủ thông tin";
      return;
    }
    const date = new Date(this.$date.getValue().value);
    if (date.getDate() !== 1) {
      this.$notify.innerHTML = "Vui lòng chọn ngày đầu tiên của tháng";
      return;
    }
    this.$pendingBtn.pending();
    const newData = await addNewTarget({
      kpiDate: this.$date.getValue().value,
      kpiTarget: this.$target.getValue().value,
      userCode: this.codeUser
    });
    if (newData.error) {
      this.$notify.innerHTML = "Tạo mục tiêu thất bại";
      this.$pendingBtn.unPending();
      return;
    }
    if (newData.status === 1) {
      this.$notify.innerHTML = newData.message;
      this.$pendingBtn.unPending();
      return;
    }
    this.$notify.innerHTML = "";
    this.resetInput();
    this.getTarget();
    this.$pendingBtn.unPending();
    this.closeTarget();
  };
  resetInput = () => {
    this.$target.reset();
    this.$date.reset();
    this.$notify.innerHTML = "";
  };

  render() {
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);
    this.$content.appendChild(this.$header);
    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);

    this.$content.appendChild(this.$body);

    this.$body.appendChild(this.$border);
    this.$body.appendChild(this.$notify);

    this.$border.appendChild(this.$target.render());
    this.$border.appendChild(this.$date.render());

    this.$content.appendChild(this.$footer);
    this.$footer.appendChild(this.$saveBtn);
    return this.$container;
  }
}
export default AddTarget;
