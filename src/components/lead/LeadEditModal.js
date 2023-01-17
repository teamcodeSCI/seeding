import { getBrand } from "../../apis/getInfo.js";
import { splitStr } from "../../util/splitStr.js";
import InputGroup from "../InputGroup.js";
import SuggestItem from "../SuggestItem.js";
import Textarea from "../Textarea.js";

class LeadEditModal {
  constructor({ data, closeLeadEditModal }) {
    this.data = data;
    this.closeLeadEditModal = closeLeadEditModal;
    this.$container = document.createElement("div");
    this.$container.className = `modal d-flex align-items-center justify-content-center`;
    this.$container.style.background = "rgba(0,0,0,0.7)";

    this.$dialog = document.createElement("div");
    this.$dialog.className = `modal-dialog`;
    this.$dialog.style.maxWidth = "650px";
    this.$dialog.style.width = "90%";

    this.$content = document.createElement("div");
    this.$content.className = `modal-content`;

    this.$header = document.createElement("div");
    this.$header.className = `modal-header`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = `Sửa thông tin`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      this.closeLeadEditModal();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body p-4`;

    this.$border = document.createElement("div");
    this.$border.className = `bg-white d-flex justify-content-between flex-wrap gap-3`;

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$saveBtn = document.createElement("button");
    this.$saveBtn.className = "btn btn-primary";
    this.$saveBtn.innerHTML = "Lưu thay đổi";
    this.$saveBtn.addEventListener("click", () => {
      this.clickSave();
    });
    this.$name = new InputGroup({
      placeholder: "Họ và tên",
      width: "48%",
      value: this.data.name
    });
    this.$phone = new InputGroup({
      placeholder: "Điện thoại",
      width: "48%",
      value: this.data.phonenumber
    });
    this.$nameFb = new InputGroup({
      placeholder: "Tên FB",
      width: "48%",
      value: this.data.nameFb
    });
    this.$linkFb = new InputGroup({
      placeholder: "Link FB",
      width: "48%",
      value: this.data.linkFb
    });
    this.$service = new InputGroup({
      placeholder: "Dịch vụ đăng ký",
      width: "48%",
      value: this.data.service
    });
    this.$branchBox = document.createElement("div");
    this.$branchBox.className = "branchBox position-relative";
    this.$branchBox.style.width = "48%";
    this.$branchBox.addEventListener("click", () => {
      this.handleSuggest();
    });
    this.$branch = new InputGroup({
      placeholder: "Chi nhánh",
      width: "100%",
      value: this.data.branch,
      isSuggested: true,
      getSuggest: this.getSuggest,
      openSuggest: this.openSuggest,
      closeSuggest: this.closeSuggest
    });
    this.$script = new InputGroup({
      placeholder: "Kịch bản",
      width: "48%",
      value: this.data.script
    });
    this.$interactive = new InputGroup({
      placeholder: "Tương tác",
      width: "48%",
      value: this.data.interactive
    });
    this.$note = new Textarea({
      palaceHolder: "Ghi chú",
      value: this.data.note
    });

    this.$suggestBox = document.createElement("div");
    this.$suggestBox.className =
      "position-absolute w-100 top-100 start-0 rounded-1";
    this.$suggestBox.style.maxHeight = "300px";
    this.$suggestBox.style.overflow = "overlay";
    this.$suggestBox.style.background = "#fff";
    this.$suggestBox.style.zIndex = 1;
    this.$suggestBox.style.boxShadow = "1px 1px 3px 0px rgba(0,0,0,0.2)";
  }
  clickSave = () => {
    if (
      this.$name.getValue() === "" ||
      this.$phone.getValue() === "" ||
      this.$nameFb.getValue() === "" ||
      this.$linkFb.getValue() === "" ||
      this.$service.getValue() === "" ||
      this.$branch.getValue() === ""
    ) {
      this.$name.fail();
      this.$phone.fail();
      this.$nameFb.fail();
      this.$linkFb.fail();
      this.$service.fail();
      this.$branch.fail();
      return;
    }
    this.$name.success();
    this.$phone.success();
    this.$nameFb.success();
    this.$linkFb.success();
    this.$service.success();
    this.$branch.success();
    this.closeLeadEditModal();
  };
  handleSuggest = () => {
    if (this.$branchBox !== this.$suggestBox.parentElement) {
      this.openSuggest();
    } else {
      this.closeSuggest();
    }
  };
  openSuggest = () => {
    this.$branchBox.appendChild(this.$suggestBox);
  };
  closeSuggest = () => {
    this.$branchBox.removeChild(this.$suggestBox);
  };
  getSuggest = async (input) => {
    const suggest = await getBrand({
      token: splitStr(localStorage.getItem("token")).token,
      input: input
    });
    if (!suggest) {
      console.log("data not found");
      return;
    }
    this.$suggestBox.innerHTML = "";
    suggest.forEach((item) => {
      this.$suggestItem = new SuggestItem({
        name: item.name,
        setBranchVal: this.$branch.setValue
      });
      this.$suggestBox.appendChild(this.$suggestItem.render());
    });
  };
  render() {
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);
    this.$content.appendChild(this.$header);
    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);
    this.$content.appendChild(this.$body);
    this.$body.appendChild(this.$border);

    this.$border.appendChild(this.$name.render());
    this.$border.appendChild(this.$phone.render());
    this.$border.appendChild(this.$nameFb.render());
    this.$border.appendChild(this.$linkFb.render());
    this.$border.appendChild(this.$service.render());
    this.$border.appendChild(this.$branchBox);
    this.$branchBox.appendChild(this.$branch.render());
    this.$border.appendChild(this.$script.render());
    this.$border.appendChild(this.$interactive.render());
    this.$border.appendChild(this.$note.render());

    this.$content.appendChild(this.$footer);
    this.$footer.appendChild(this.$saveBtn);
    return this.$container;
  }
}
export default LeadEditModal;
