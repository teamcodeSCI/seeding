import { getBranch } from "../../apis/getInfo.js";
import { createLead } from "../../apis/lead.js";
import { splitStr } from "../../util/splitStr.js";
import InputGroup from "../InputGroup.js";
import SuggestItem from "../SuggestItem.js";
import Textarea from "../Textarea.js";

class LeadAddModal {
  constructor({ closeLeadAddModal, getAllLead }) {
    this.closeLeadAddModal = closeLeadAddModal;
    this.getAllLead = getAllLead;
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
    this.$header.className = `modal-header px-3 py-2`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = `Thêm thông tin`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      this.closeLeadAddModal();
      this.reset();
      if (this.$branchBox === this.$suggestBox.parentElement) {
        this.closeSuggest();
      }
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body px-4 py-3`;

    this.$border = document.createElement("div");
    this.$border.className = `bg-white d-flex justify-content-between flex-column gap-2`;

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$saveBtn = document.createElement("button");
    this.$saveBtn.className = "btn btn-primary";
    this.$saveBtn.innerHTML = "Thêm mới";
    this.$saveBtn.addEventListener("click", () => {
      this.clickSave();
    });
    this.$pendingBtn = document.createElement("button");
    this.$pendingBtn.className = "btn btn-secondary";
    this.$pendingBtn.innerHTML = "Vui lòng chờ ...";

    this.$name = new InputGroup({ placeholder: "Họ và tên" });
    this.$phone = new InputGroup({ placeholder: "Điện thoại" });
    this.$nameFb = new InputGroup({ placeholder: "Tên FB" });
    this.$linkFb = new InputGroup({ placeholder: "Link FB" });
    this.$service = new InputGroup({
      placeholder: "Dịch vụ đăng ký"
    });
    this.$branchBox = document.createElement("div");
    this.$branchBox.className = "branchBox position-relative";

    this.$branchBox.addEventListener("click", () => {
      this.handleSuggest();
    });

    this.$branch = new InputGroup({
      placeholder: "Chi nhánh",
      width: "100%",
      isSuggested: true,
      getSuggest: this.getSuggest,
      openSuggest: this.openSuggest,
      closeSuggest: this.closeSuggest
    });

    this.$script = new InputGroup({ placeholder: "Kịch bản" });
    this.$interactive = new InputGroup({
      placeholder: "Tương tác"
    });
    this.$note = new Textarea({ palaceHolder: "Ghi chú" });

    this.$suggestBox = document.createElement("div");
    this.$suggestBox.className =
      "position-absolute w-100 top-100 start-0 rounded-1";
    this.$suggestBox.style.maxHeight = "150px";
    this.$suggestBox.style.overflow = "overlay";
    this.$suggestBox.style.background = "#fff";
    this.$suggestBox.style.zIndex = 1;
    this.$suggestBox.style.boxShadow = "1px 1px 3px 0px rgba(0,0,0,0.2)";
    this.getSuggest(this.$branch.getValue().value);
  }
  reset = () => {
    this.$name.reset(),
      this.$phone.reset(),
      this.$nameFb.reset(),
      this.$linkFb.reset(),
      this.$service.reset(),
      this.$branch.reset(),
      this.$script.reset(),
      this.$note.reset(),
      this.$interactive.reset();
  };
  pending = () => {
    this.$footer.innerHTML = "";
    this.$footer.appendChild(this.$pendingBtn);
  };
  unPending = () => {
    this.$footer.innerHTML = "";
    this.$footer.appendChild(this.$saveBtn);
  };
  clickSave = async () => {
    if (
      this.$name.getValue().value === "" ||
      this.$phone.getValue().value === "" ||
      this.$service.getValue().value === "" ||
      this.$branch.getValue().hideValue === ""
    ) {
      this.$name.fail();
      this.$phone.fail();
      this.$service.fail();
      this.$branch.fail();

      return;
    }
    this.pending();
    await createLead({
      name: this.$name.getValue().value,
      phone: this.$phone.getValue().value,
      nameFb: this.$nameFb.getValue().value,
      linkFb: this.$linkFb.getValue().value,
      service: this.$service.getValue().value,
      branch: this.$branch.getValue().hideValue,
      script: this.$script.getValue().value,
      note: this.$note.getValue(),
      interactive: this.$interactive.getValue().value
    });
    if (this.$branchBox === this.$suggestBox.parentElement) {
      this.closeSuggest();
    }
    this.reset();
    this.closeLeadAddModal();
    this.getAllLead();
    this.unPending();
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
    if (!localStorage.getItem("token")) {
      return;
    }
    const suggest = await getBranch({
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
        code: item.code,
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
export default LeadAddModal;
