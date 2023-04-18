class PendingBtn {
  constructor(container, btn) {
    this.btn = btn;
    this.container = container;
    this.$pendingBtn = document.createElement("button");
    this.$pendingBtn.className = "btn btn-secondary";
    this.$pendingBtn.innerHTML = "Vui lòng chờ ...";
  }
  pending = () => {
    this.container.innerHTML = "";
    this.container.appendChild(this.$pendingBtn);
  };
  unPending = () => {
    this.container.innerHTML = "";
    this.container.appendChild(this.btn);
  };
  render() {
    return this.$pendingBtn;
  }
}
export default PendingBtn;
