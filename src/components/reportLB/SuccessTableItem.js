class SuccessTableItem {
  constructor({ stt, service, number, highest }) {
    this.$tr = document.createElement("tr");
    this.$tr.className = "align-middle";

    this.$stt = document.createElement("td");
    this.$stt.innerHTML = stt;

    this.$service = document.createElement("td");
    this.$service.innerHTML = service;

    this.$numberic = document.createElement("td");
    this.$numberic.style.width = "45%";

    this.$numbericBox = document.createElement("div");
    this.$numbericBox.className = "d-flex align-items-center gap-2";

    this.$progress = document.createElement("div");
    this.$progress.className = "progress w-100";
    this.$progress.style.height = "10px";

    this.$progressBar = document.createElement("div");
    this.$progressBar.className = "progress-bar";
    this.$progressBar.style.width = `${(number * 100) / highest}%`;

    this.$number = document.createElement("span");
    this.$number.innerHTML = number;
  }
  render() {
    this.$tr.appendChild(this.$stt);
    this.$tr.appendChild(this.$service);

    this.$tr.appendChild(this.$numberic);
    this.$numberic.appendChild(this.$numbericBox);
    this.$numbericBox.appendChild(this.$progress);
    this.$numbericBox.appendChild(this.$number);
    this.$progress.appendChild(this.$progressBar);

    return this.$tr;
  }
}
export default SuccessTableItem;
