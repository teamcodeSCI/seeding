import { duplicate } from "../../apis/duplicate.js";
import { formatDate } from "../../util/util.js";
import InputGroup from "../InputGroup.js";
import Loading from "../Loading.js";
import SearchInput from "../SearchInput.js";
import DuplicateList from "./DuplicateList.js";

class Duplicate {
  phone = "";
  constructor() {
    this.$container = document.createElement("div");
    this.$container.className = "duplicate datatable px-3 py-4 bg-white";

    this.$control = document.createElement("div");
    this.$control.className =
      "control d-flex justify-content-between mt-3 mb-4 align-items-end mx-1";

    this.$search = new SearchInput({
      placeholder: "Tìm theo số điện thoại ...",
      width: "20%",
      filterSearch: this.getDuplicate
    });

    this.$inputGroup = document.createElement("div");
    this.$inputGroup.className = "d-flex gap-2 align-items-end";

    this.$startDate = new InputGroup({
      title: "Ngày",
      type: "date",
      width: "100%",
      value: ""
    });

    this.$submitBtn = document.createElement("button");
    this.$submitBtn.className = "btn btn-primary py-1 px-2";
    this.$submitBtn.style.fontSize = "14px";
    this.$submitBtn.addEventListener("click", () => {
      this.getDuplicate();
    });
    this.$searchIcon = document.createElement("i");
    this.$searchIcon.className = "bi bi-search";

    this.$table = document.createElement("div");
    this.$table.className = "table";
    this.$loading = new Loading();
  }

  getDuplicate = async () => {
    this.$table.appendChild(this.$loading.render());
    const duplicateData = await duplicate({
      endDate: this.$startDate.getValue().value,
      startDate: formatDate(
        new Date(this.$startDate.getValue().value).setDate(
          new Date(this.$startDate.getValue().value).getDate() - 1
        )
      ),
      phone: this.$search.getValue() || ""
    });
    this.$table.removeChild(this.$loading.render());
    this.$table.innerHTML = "";
    this.$duplicateList = new DuplicateList({ data: duplicateData.data });
    this.$table.appendChild(this.$duplicateList.render());
  };
  render() {
    this.getDuplicate();
    this.$container.appendChild(this.$control);
    this.$container.appendChild(this.$table);
    this.$control.appendChild(this.$search.render());
    this.$control.appendChild(this.$inputGroup);
    this.$inputGroup.appendChild(this.$startDate.render());

    this.$inputGroup.appendChild(this.$submitBtn);
    this.$submitBtn.appendChild(this.$searchIcon);
    return this.$container;
  }
}
export default Duplicate;
