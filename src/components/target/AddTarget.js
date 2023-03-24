import { addNewTarget } from "../../apis/target.js";
import { suggestUser } from "../../apis/userList.js";
import InputGroup from "../InputGroup.js";
import SuggestItem from "../SuggestItem.js";

class AddTarget {
  constructor({ handleAddTarget }) {
    this.handleAddTarget = handleAddTarget;
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
      handleAddTarget();
      this.resetInput();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body px-4 py-3`;

    this.$border = document.createElement("div");
    this.$border.className = `bg-white d-flex justify-content-between flex-wrap gap-2`;

    this.$notify = document.createElement("p");
    this.$notify.className = "m-0 text-center fst-italic text-danger";
    this.$notify.style.fontSize = "14px";

    this.$nameBox = document.createElement("div");
    this.$nameBox.className = "nameBox position-relative w-100";
    this.$nameBox.addEventListener("click", () => {
      this.handleSuggest();
    });

    this.$suggestBox = document.createElement("div");
    this.$suggestBox.className =
      "position-absolute w-100 top-100 start-0 rounded-1 px-2 py-1";
    this.$suggestBox.style.maxHeight = "150px";
    this.$suggestBox.style.overflow = "overlay";
    this.$suggestBox.style.background = "#fff";
    this.$suggestBox.style.zIndex = 1;
    this.$suggestBox.style.boxShadow = "1px 1px 3px 0px rgba(0,0,0,0.2)";

    this.$name = new InputGroup({
      placeholder: "Nhân viên",
      width: "100%",
      isSuggested: true,
      getSuggest: this.getSuggest,
      openSuggest: this.openSuggest,
      closeSuggest: this.closeSuggest
    });
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

    this.getSuggest(this.$name.getValue().value);
  }
  saveTarget = async () => {
    if (
      this.$name.getValue().hideValue === "" ||
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

    const newData = await addNewTarget({
      kpiDate: this.$date.getValue().value,
      kpiTarget: this.$target.getValue().value,
      userCode: this.$name.getValue().hideValue
    });
    if (newData.error) {
      this.$notify.innerHTML = "Tạo mục tiêu thất bại";
      return;
    }
    if (newData.status === 1) {
      this.$notify.innerHTML = newData.message;
      return;
    }
    this.$notify.innerHTML = "";
    this.handleAddTarget();
    this.resetInput();
  };
  resetInput = () => {
    this.$name.reset();
    this.$target.reset();
    this.$date.reset();
    this.$notify.innerHTML = "";
    if (this.$nameBox === this.$suggestBox.parentElement) {
      this.closeSuggest();
    }
  };
  openSuggest = () => {
    this.$nameBox.appendChild(this.$suggestBox);
  };
  closeSuggest = () => {
    this.$nameBox.removeChild(this.$suggestBox);
  };
  handleSuggest = () => {
    if (this.$nameBox !== this.$suggestBox.parentElement) {
      this.openSuggest();
    } else {
      this.closeSuggest();
    }
  };
  getSuggest = async (input) => {
    const getUser = await suggestUser(input);
    this.$suggestBox.innerHTML = "";
    for (let i = 1; i < getUser.length; i++) {
      if (getUser[i].active_user) {
        this.$suggestItem = new SuggestItem({
          name: getUser[i].name,
          code: getUser[i].code_user,
          setBranchVal: this.$name.setValue
        });
        this.$suggestBox.appendChild(this.$suggestItem.render());
      }
    }
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

    this.$border.appendChild(this.$nameBox);
    this.$border.appendChild(this.$target.render());
    this.$border.appendChild(this.$date.render());

    this.$nameBox.appendChild(this.$name.render());

    this.$content.appendChild(this.$footer);
    this.$footer.appendChild(this.$saveBtn);
    return this.$container;
  }
}
export default AddTarget;
