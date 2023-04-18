import { updateTarget } from "../../apis/target.js";
import InputGroup from "../InputGroup.js";
import PendingBtn from "../PendingBtn.js";

class EditTargetModal {
  constructor({
    closeModal,
    date,
    target,
    targetId,
    getTarget,
    codeUser,
    month
  }) {
    console.log(date);
    this.codeUser = codeUser;
    this.getTarget = getTarget;
    this.targetId = targetId;
    this.closeModal = closeModal;
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
    this.$title.innerHTML = month;

    this.$notify = document.createElement("p");
    this.$notify.className = "m-0 text-center fst-italic text-danger";
    this.$notify.style.fontSize = "14px";

    this.$body = document.createElement("div");
    this.$body.className = `modal-body px-4 py-3`;

    this.$border = document.createElement("div");
    this.$border.className = `bg-white d-flex justify-content-between gap-2 flex-column mb-2`;

    this.$date = new InputGroup({
      placeholder: "",
      type: "date",
      value: date
    });
    this.$target = new InputGroup({
      placeholder: "Nhập mục tiêu",
      value: target
    });

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$saveBtn = document.createElement("button");
    this.$saveBtn.className = "btn btn-primary";
    this.$saveBtn.innerHTML = "Cập nhật";
    this.$saveBtn.addEventListener("click", () => {
      this.save();
    });
    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      this.closeModal();
    });
    this.pendingBtn = new PendingBtn(this.$footer, this.$saveBtn);
  }
  save = async () => {
    if (
      this.$date.getValue().value === "" ||
      this.$target.getValue().value === ""
    ) {
      this.$notify.innerHTML = "Hãy nhập đầy đủ thông tin!";
      return;
    }
    const date = new Date(this.$date.getValue().value);
    if (date.getDate() !== 1) {
      this.$notify.innerHTML = "Vui lòng chọn ngày đầu tiên của tháng";
      return;
    }
    this.pendingBtn.pending();
    this.$notify.innerHTML = "";
    const update = await updateTarget({
      target: this.$target.getValue().value,
      id: this.targetId,
      date: this.$date.getValue().value,
      codeUser: this.codeUser
    });

    if (update.status !== 0) {
      this.$notify.innerHTML = update.message;
      this.pendingBtn.unPending();
      return;
    }
    this.pendingBtn.unPending();
    this.getTarget();
    this.closeModal();
  };
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

    this.$border.appendChild(this.$date.render());
    this.$border.appendChild(this.$target.render());

    this.$footer.appendChild(this.$saveBtn);
    return this.$container;
  }
}
export default EditTargetModal;
