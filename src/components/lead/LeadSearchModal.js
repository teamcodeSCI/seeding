import { getBranch } from "../../apis/getInfo.js";
import { role } from "../../util/const.js";
import { splitStr } from "../../util/splitStr.js";
import InputGroup from "../InputGroup.js";
import SuggestItem from "../SuggestItem.js";

class LeadSearchModal {
  constructor({ closeLeadSearchModal, setSearchValue }) {
    this.setSearchValue = setSearchValue;
    this.closeLeadSearchModal = closeLeadSearchModal;
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
    this.$title.innerHTML = `Tìm kiếm`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      this.closeLeadSearchModal();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body px-4 py-3`;

    this.$line = document.createElement("div");
    this.$line.className = "my-3";
    this.$line.style.backgroundColor = " #ced4da";
    this.$line.style.height = "1px";

    this.$border = document.createElement("div");
    this.$border.className = `bg-white d-flex justify-content-between gap-2 flex-column`;

    this.$advance = document.createElement("div");
    this.$advance.className = `bg-white d-flex justify-content-between flex-wrap gap-2`;

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$search = document.createElement("button");
    this.$search.className = "btn btn-primary";
    this.$search.innerHTML = "Tìm kiếm";
    this.$search.addEventListener("click", () => {
      this.search();
    });

    this.$searchName = new InputGroup({ placeholder: "Họ Tên" });
    this.$phone = new InputGroup({
      placeholder: "Số điện thoại"
    });
    this.$nameFb = new InputGroup({ placeholder: "Tên FB" });
    this.$service = new InputGroup({ placeholder: "Dịch vụ" });
    this.$user = new InputGroup({ placeholder: "Nhân viên" });
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
    this.$startDate = new InputGroup({
      placeholder: "Từ",
      title: "Từ",
      type: "date",
      width: "48%"
    });
    this.$endDate = new InputGroup({
      placeholder: "Đến",
      title: "Đến",
      type: "date",
      width: "48%"
    });
    this.$suggestBox = document.createElement("div");
    this.$suggestBox.className =
      "position-absolute w-100 top-100 start-0 rounded-1";
    this.$suggestBox.style.maxHeight = "150px";
    this.$suggestBox.style.overflow = "overlay";
    this.$suggestBox.style.background = "#fff";
    this.$suggestBox.style.zIndex = 1;
    this.$suggestBox.style.boxShadow = "1px 1px 3px 0px rgba(0,0,0,0.2)";
  }
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
  search = () => {
    this.setSearchValue(
      this.$searchName.getValue().value,
      this.$phone.getValue().value,
      this.$service.getValue().value,
      this.$nameFb.getValue().value,
      this.$branch.getValue().hideValue,
      this.$branch.getValue().value,
      this.$user.getValue().value,
      this.$startDate.getValue().value,
      this.$endDate.getValue().value
    );
    this.closeLeadSearchModal();
  };

  render() {
    this.getSuggest(this.$branch.getValue().value);
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);
    this.$content.appendChild(this.$header);
    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);
    this.$content.appendChild(this.$body);
    this.$body.appendChild(this.$border);
    this.$body.appendChild(this.$line);
    this.$body.appendChild(this.$advance);

    this.$border.appendChild(this.$searchName.render());
    this.$border.appendChild(this.$phone.render());
    this.$border.appendChild(this.$nameFb.render());
    this.$border.appendChild(this.$service.render());
    this.$border.appendChild(this.$branchBox);
    this.$branchBox.appendChild(this.$branch.render());
    if (role === "admin") this.$border.appendChild(this.$user.render());
    this.$advance.appendChild(this.$startDate.render());
    this.$advance.appendChild(this.$endDate.render());

    this.$content.appendChild(this.$footer);

    this.$footer.appendChild(this.$search);

    return this.$container;
  }
}
export default LeadSearchModal;
