import { delLead } from "../../apis/lead.js";

export default class DeleteModal {
  constructor({ closeDelModal, codeForm, getAllLead }) {
    this.closeDelModal = closeDelModal;
    this.codeForm = codeForm;
    this.getAllLead = getAllLead;
    this.$container = document.createElement("div");
    this.$container.className = `modal d-flex align-items-center justify-content-center`;
    this.$container.style.cssText = `background:rgba(0,0,0,0.5); z-index:100`;

    this.$dialog = document.createElement("div");
    this.$dialog.className = `modal-dialog`;
    this.$dialog.style.cssText = `max-width: 400px; width: 90%`;

    this.$content = document.createElement("div");
    this.$content.className = `modal-content`;

    this.$header = document.createElement("div");
    this.$header.className = `modal-header px-3 py-2`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title fs-5`;
    this.$title.innerHTML = `Xóa dữ liệu`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      closeDelModal();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body d-flex justify-content-center px-3 pt-3 pb-4 gap-2`;

    this.$cancelBtn = document.createElement("button");
    this.$cancelBtn.className = "btn btn-primary";
    this.$cancelBtn.innerHTML = "Hủy";
    this.$cancelBtn.addEventListener("click", () => {
      closeDelModal();
    });

    this.$submitBtn = document.createElement("button");
    this.$submitBtn.className = "btn btn-outline-primary";
    this.$submitBtn.innerHTML = "Xóa";
    this.$submitBtn.addEventListener("click", () => {
      this.delForm();
    });
  }
  delForm = async () => {
    const data = await delLead({ codeForm: this.codeForm });
    if (data.result.status === 1) {
      return;
    }
    this.getAllLead();
    this.closeDelModal();
  };
  render() {
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);

    this.$content.appendChild(this.$header);
    this.$content.appendChild(this.$body);
    this.$body.appendChild(this.$cancelBtn);
    this.$body.appendChild(this.$submitBtn);

    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);

    return this.$container;
  }
}
