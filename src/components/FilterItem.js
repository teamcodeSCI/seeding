class FilterItem {
  constructor({ title, selectItem, hideVal }) {
    this.$container = document.createElement("li");
    this.$container.className = "dropdownItem list-group-item";
    this.$container.style.cursor = "pointer";
    this.$container.innerHTML = title;
    this.$container.addEventListener("click", () => {
      selectItem(title, hideVal);
    });
  }
  render() {
    return this.$container;
  }
}
export default FilterItem;
