import FilterItem from "./FilterItem.js";
class DropdownBooking {
  constructor({ filterSearch, data, title, setFilter }) {
    this.setFilter = setFilter;
    this.filterSearch = filterSearch;
    this.data = data;
    this.$container = document.createElement("div");
    this.$container.className = "border-bottom position-relative ";
    this.$container.style.minWidth = "170px";

    this.$filterBtn = document.createElement("button");
    this.$filterBtn.className =
      "dropdown-toggle bg-white px-2 py-1 border-0 w-100 d-flex justify-content-between align-items-center";

    this.$filterValue = document.createElement("input");
    this.$filterValue.type = "hidden";

    this.$filterBtn.innerHTML = title;
    this.$filterBtn.style.fontSize = "14px";
    this.$filterBtn.addEventListener("click", () => {
      this.openFilter();
    });

    this.$filterBox = document.createElement("ul");
    this.$filterBox.className =
      "position-absolute w-100 list-group list-group-flush";
    this.$filterBox.style.top = "31px";
    this.$filterBox.style.fontSize = "14px";
    this.$filterBox.style.boxShadow = "1px 2px 3px 1px rgba(0,0,0,0.2)";
    this.renderItem();
  }
  selectItem = (val, hideVal) => {
    this.$filterBtn.innerHTML = val;
    this.$filterValue.value = hideVal;
    this.setFilter(this.$filterValue.value);
    this.filterSearch();
    this.closeFilter();
  };
  getValue = () => {
    return { val: this.$filterBtn.innerHTML, hideVal: this.$filterValue.value };
  };
  openFilter = () => {
    if (this.$filterBox.parentElement !== this.$container) {
      this.$container.appendChild(this.$filterBox);
      return;
    }
    this.$container.removeChild(this.$filterBox);
  };
  closeFilter = () => {
    this.$container.removeChild(this.$filterBox);
  };
  renderItem = () => {
    this.$filterBox.innerHTML = "";

    for (let i = 0; i < this.data.length; i++) {
      this.$item = new FilterItem({
        title: this.data[i].name,
        hideVal: this.data[i].value,
        selectItem: this.selectItem
      });
      this.$filterBox.appendChild(this.$item.render());
    }
  };
  render() {
    this.$container.appendChild(this.$filterBtn);
    return this.$container;
  }
}
export default DropdownBooking;
