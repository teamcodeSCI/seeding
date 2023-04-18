import { app } from "../../util/const.js";
import { formatMoney, formatNumber } from "../../util/util.js";
import EditTargetModal from "../target/EditTargetModal.js";

class LeadDetailItem {
  constructor({
    title,
    value,
    link,
    isUpdateTarget,
    id,
    getTarget,
    date,
    codeUser
  }) {
    this.isUpdateTarget = isUpdateTarget;
    this.$container = document.createElement("p");
    this.$container.className = "d-flex m-0 gap-2 px-2 py-1 position-relative";
    this.$container.style.background = "#f7f7f7";
    this.$container.style.fontSize = "14px";

    this.$title = document.createElement("b");
    this.$title.className = "col-6";
    this.$title.style.fontWeight = "600";
    this.$title.innerHTML = `${title}: `;
    if (link) {
      this.$value = document.createElement("a");
      this.$value.className = "col-6 p-0 btn btn-link text-start";
      this.$value.target = "_blank";
      this.$value.style.fontSize = "14px";
      this.$value.href = link;
      this.$value.innerHTML = value;
    } else {
      this.$value = document.createElement("span");
      this.$value.className = "col-6";
      this.$value.innerHTML = isUpdateTarget
        ? `${formatNumber(value)} Đ`
        : value;
    }
    if (isUpdateTarget) {
      this.$editTarget = new EditTargetModal({
        closeModal: this.closeEditTarget,
        date: date,
        target: value,
        targetId: id,
        getTarget: getTarget,
        codeUser: codeUser,
        month: title
      });
    }
  }
  openEditTarget = () => {
    app.appendChild(this.$editTarget.render());
  };
  closeEditTarget = () => {
    app.removeChild(this.$editTarget.render());
  };
  renderUpdateBtn() {
    if (this.isUpdateTarget) {
      this.$targetBtn = document.createElement("button");
      this.$targetBtn.className =
        "position-absolute w-auto border-0 p-0 bg-transparent";
      this.$targetBtn.style.right = "5px";
      this.$targetIcon = document.createElement("i");
      this.$targetIcon.className = "bi bi-pencil text-primary";
      this.$targetBtn.addEventListener("click", () => {
        this.openEditTarget();
      });
      this.$container.appendChild(this.$targetBtn);
      this.$targetBtn.appendChild(this.$targetIcon);
    }
  }
  render() {
    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$value);
    this.renderUpdateBtn();
    return this.$container;
  }
}
export default LeadDetailItem;
