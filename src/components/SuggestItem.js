export default class SuggestItem {
  constructor({ name, code, setBranchVal }) {
    this.$container = document.createElement("div");
    this.$container.className = "dropdownItem p-1";
    this.$container.style.fontSize = "14px";
    this.$container.style.cursor = "pointer";
    this.$container.innerHTML = name;
    this.$container.addEventListener("click", () => {
      setBranchVal({ val: name, hideVal: code });
    });
  }
  render() {
    return this.$container;
  }
}
