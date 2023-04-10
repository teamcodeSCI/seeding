class BookingDetailItem {
  constructor({ title, value, link }) {
    this.$container = document.createElement("p");
    this.$container.className = "d-flex m-0 gap-2 w-100";
    this.$container.style.fontSize = "14px";

    this.$title = document.createElement("b");
    this.$title.className = "col-6";
    this.$title.style.fontWeight = "600";
    this.$title.innerHTML = `${title}: `;
    if (link) {
      this.$value = document.createElement("a");
      this.$value.className = "col-6 p-0 btn btn-link text-start";
      this.$value.target = "_blank";
      this.$value.style.fontSize = "14px";
      this.$value.href = link;
      this.$value.innerHTML = value;
    } else {
      this.$value = document.createElement("span");
      this.$value.className = "col-6";
      this.$value.innerHTML = value;
    }
  }
  render() {
    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$value);
    return this.$container;
  }
}
export default BookingDetailItem;
