import { fetchTarget } from "../../apis/target.js";
import { app } from "../../util/const.js";
import AddTarget from "./AddTarget.js";
import TargetList from "./TargetList.js";

class Target {
  constructor() {
    this.$container = document.createElement("div");
    this.$container.className = "datatable px-3 py-4 bg-white";

    this.$header = document.createElement("div");
    this.$header.className =
      "mb-4 d-flex justify-content-between align-items-center gap-3";

    this.$title = document.createElement("span");
    this.$title.className = "targetTitle fs-5 fw-bold text-uppercase";
    this.$title.innerHTML = "Mục tiêu";

    this.$addBtn = document.createElement("button");
    this.$addBtn.className =
      "btn btn-primary d-inline-flex gap-2 justify-content-between ";
    this.$addBtn.addEventListener("click", () => {
      this.openAddTarget();
    });
    this.$addBtnText = document.createElement("span");
    this.$addBtnText.innerHTML = "Thêm mới";

    this.$addBtnIcon = document.createElement("i");
    this.$addBtnIcon.className = "bi bi-plus-lg";

    this.$addTarget = new AddTarget({ handleAddTarget: this.closeAddTarget });
    this.$table = document.createElement("table");

    this.$body = document.createElement("div");
    this.$body.className = "targetBody";
  }
  getTarget = async () => {
    this.$body.innerHTML = "";
    const data = await fetchTarget();
    this.$targetTable = new TargetList({ data: data });
    this.$body.appendChild(this.$targetTable.render());
  };
  openAddTarget = () => {
    app.appendChild(this.$addTarget.render());
  };
  closeAddTarget = () => {
    app.removeChild(this.$addTarget.render());
  };

  render() {
    this.getTarget();
    this.$container.appendChild(this.$header);
    this.$container.appendChild(this.$body);
    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$addBtn);
    this.$addBtn.appendChild(this.$addBtnText);
    this.$addBtn.appendChild(this.$addBtnIcon);

    return this.$container;
  }
}
export default Target;
