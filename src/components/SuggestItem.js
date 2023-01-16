export default class SuggestItem {
  constructor({ name, setBranchVal }) {
    this.$container = document.createElement("div");
    this.$container.className = "dropdownItem p-1";
    this.$container.style.fontSize = "14px";
    this.$container.style.cursor = "pointer";
    this.$container.innerHTML = name;
    this.$container.addEventListener("click", () => {
      setBranchVal(name);
    });
  }
  render() {
    return this.$container;
  }
}
