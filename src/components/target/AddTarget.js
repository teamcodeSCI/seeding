import InputGroup from "../InputGroup.js";

class AddTarget {
  constructor({ handleAddTarget }) {
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
    this.$header.className = `modal-header`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = `Thêm thông tin`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      handleAddTarget();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body px-4 py-3`;

    this.$border = document.createElement("div");
    this.$border.className = `bg-white d-flex justify-content-between flex-wrap gap-2`;

    this.$notify = document.createElement("p");
    this.$notify.className = "m-0 text-center fst-italic text-danger";
    this.$notify.style.fontSize = "14px";

    this.$targetBox = document.createElement("div");
    this.$targetBox.className = "targetBox position-relative w-100";
    this.$targetBox.addEventListener("click", () => {
      this.handleSuggest();
    });

    this.$suggestBox = document.createElement("div");
    this.$suggestBox.className =
      "position-absolute w-100 top-100 start-0 rounded-1 px-2 py-3";
    this.$suggestBox.style.maxHeight = "150px";
    this.$suggestBox.style.overflow = "overlay";
    this.$suggestBox.style.background = "#fff";
    this.$suggestBox.style.zIndex = 1;
    this.$suggestBox.style.boxShadow = "1px 1px 3px 0px rgba(0,0,0,0.2)";

    this.$name = new InputGroup({ placeholder: "Nhân viên" });
    this.$target = new InputGroup({
      placeholder: "Mục tiêu",
      width: "100%",
      isSuggested: true,
      getSuggest: this.getSuggest,
      openSuggest: this.openSuggest,
      closeSuggest: this.closeSuggest
    });
    this.$date = new InputGroup({ placeholder: "Tháng", type: "date" });

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$saveBtn = document.createElement("button");
    this.$saveBtn.className = "btn btn-primary";
    this.$saveBtn.innerHTML = "Thêm mới";
    this.$saveBtn.addEventListener("click", () => {});
  }
  openSuggest = () => {
    this.$targetBox.appendChild(this.$suggestBox);
  };
  closeSuggest = () => {
    this.$targetBox.removeChild(this.$suggestBox);
  };
  handleSuggest = () => {
    if (this.$targetBox !== this.$suggestBox.parentElement) {
      this.openSuggest();
    } else {
      this.closeSuggest();
    }
  };
  getSuggest = () => {};
  render() {
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);
    this.$content.appendChild(this.$header);
    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);

    this.$content.appendChild(this.$body);

    this.$body.appendChild(this.$border);
    this.$body.appendChild(this.$notify);

    this.$border.appendChild(this.$name.render());
    this.$border.appendChild(this.$targetBox);
    this.$border.appendChild(this.$date.render());

    this.$targetBox.appendChild(this.$target.render());

    this.$content.appendChild(this.$footer);
    this.$footer.appendChild(this.$saveBtn);
    return this.$container;
  }
}
export default AddTarget;
