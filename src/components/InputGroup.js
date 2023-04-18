import { formatDate } from "../util/util.js";
class InputGroup {
  constructor({
    placeholder,
    type,
    width,
    title,
    value,
    hideValue,
    isDisabled,
    isSuggested,
    getSuggest,
    openSuggest,
    closeSuggest
  }) {
    this.isSuggested = isSuggested || false;
    this.$container = document.createElement("div");
    this.$container.className = "input-group flex-column gap-1";
    this.$container.style.width = width || "100%";

    this.$label = document.createElement("label");
    this.$label.className = title ? "fw-bold" : "d-none";
    this.$label.style.fontSize = "14px";
    this.$label.innerHTML = `${title}:` || "";

    this.$box = document.createElement("div");
    this.$box.className = "position-relative";

    this.$reset = document.createElement("i");
    this.$reset.className = "bi bi-x position-absolute";
    this.$reset.style.right = "5px";
    this.$reset.style.top = "50%";
    this.$reset.style.transform = "translateY(-50%)";
    this.$reset.style.cursor = "pointer";
    this.$reset.style.zIndex = "10";
    this.$reset.addEventListener("click", () => {
      this.$input.value = "";
      this.$container.removeChild(this.$reset);
    });

    this.$hideInput = document.createElement("input");
    this.$hideInput.type = "hidden";
    this.$hideInput.value = hideValue || "";

    this.$input = document.createElement("input");
    this.$input.className = "form-control w-100 fst-italic py-1 ps-2 pe-3 ";
    this.$input.style.border = "1px solid transparent";
    this.$input.style.borderRadius = "4px";
    this.$input.style.fontSize = "14px";
    this.$input.style.background = "rgb(235 235 235)";
    this.$input.type = type || "text";
    this.$input.placeholder = placeholder || "";
    this.$input.value =
      this.$input.type === "date" ? formatDate(value) : value || "";
    this.$input.disabled = isDisabled || false;
    this.$input.addEventListener("input", () => {
      this.$box.appendChild(this.$reset);
      if (this.isSuggested) {
        getSuggest(this.$input.value);
        openSuggest();
      }
      if (this.$input.value === "" || type === "date") {
        this.$container.removeChild(this.$reset);
        if (this.isSuggested) {
          closeSuggest();
        }
        return;
      }
    });
  }

  success() {
    this.$input.style.border = "1px solid #ced4da";
  }
  fail() {
    this.$input.style.border = "1px solid red";
  }
  getValue = () => {
    return { value: this.$input.value, hideValue: this.$hideInput.value };
  };
  setValue = ({ val, hideVal }) => {
    this.$input.value = val || "";
    this.$hideInput.value = hideVal || "";
  };
  reset = () => {
    this.$input.style.border = "1px solid transparent";
    this.$input.value = "";
    this.$hideInput.value = "";
    if (this.$reset.parentElement === this.$box)
      this.$box.removeChild(this.$reset);
  };
  render() {
    this.$container.appendChild(this.$label);
    this.$container.appendChild(this.$box);
    this.$box.appendChild(this.$input);

    return this.$container;
  }
}
export default InputGroup;
