class InputGroup {
  constructor({
    placeholder,
    type,
    width,
    title,
    value,
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

    this.$input = document.createElement("input");
    this.$input.className =
      "form-control w-100 fst-italic px-3 ps-2 pe-3 position-relative";
    this.$input.style.border = "1px solid transparent";
    this.$input.style.borderRadius = "4px";
    this.$input.style.fontSize = "14px";
    this.$input.style.background = "rgb(235 235 235)";
    this.$input.type = type || "text";
    this.$input.placeholder = placeholder || "";
    this.$input.value = value || "";
    this.$input.disabled = isDisabled || false;
    this.$input.addEventListener("input", () => {
      this.$container.appendChild(this.$reset);
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
    return this.$input.value;
  };
  setValue = (val) => {
    this.$input.value = val || "";
  };
  render() {
    this.$container.appendChild(this.$label);
    this.$container.appendChild(this.$input);

    return this.$container;
  }
}
export default InputGroup;
