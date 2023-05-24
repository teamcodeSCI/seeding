import { formatNumber } from "../../util/util.js";

class SalesDetail {
  sum = 0;
  constructor({ closeSalesModal, data }) {
    this.data = data;
    this.$container = document.createElement("div");
    this.$container.className = `modal d-flex align-items-center justify-content-center`;
    this.$container.style.background = "rgba(0,0,0,0.7)";

    this.$dialog = document.createElement("div");
    this.$dialog.className = `modal-dialog`;
    this.$dialog.style.maxWidth = "700px";

    this.$dialog.style.width = "90%";

    this.$content = document.createElement("div");
    this.$content.className = `modal-content`;

    this.$header = document.createElement("div");
    this.$header.className = `modal-header px-3 py-2`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = `Chi tiết`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      closeSalesModal();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body d-flex flex-column`;
    this.$body.style.gap = "0.3rem";
    this.$body.style.maxHeight = "500px";
    this.$body.style.overflow = "auto";

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$doneBtn = document.createElement("button");
    this.$doneBtn.className = "btn btn-primary";
  }
  renderItem = () => {
    this.$body.innerHTML = "";
    this.sum = 0;
    this.data.forEach((e) => {
      this.$item = document.createElement("div");
      this.$item.className = "d-flex gap-2 px-2 py-2 position-relative";
      this.$item.style.background = "rgb(247, 247, 247)";
      this.$item.style.fontSize = "14px";

      this.$service = document.createElement("div");
      this.$service.className = "text-truncate";
      this.$service.style.width = "65%";
      this.$service.innerHTML = e.dich_vu;

      this.$date = document.createElement("div");
      this.$date.className = "text-truncate text-center";
      this.$date.style.width = "20%";
      this.$date.innerHTML = e.ngay_thanh_toan;

      this.$money = document.createElement("div");
      this.$money.className = "text-truncate";
      this.$money.style.width = "15%";
      this.$money.innerHTML = `${formatNumber(e.tien)} đ`;

      this.$item.appendChild(this.$service);
      this.$item.appendChild(this.$date);
      this.$item.appendChild(this.$money);
      this.$body.appendChild(this.$item);

      this.sum += e.tien;
    });
    this.$doneBtn.innerHTML = `Tổng: ${formatNumber(this.sum)} đ`;
  };
  render() {
    this.renderItem();
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);

    this.$content.appendChild(this.$header);
    this.$content.appendChild(this.$body);

    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);

    this.$content.appendChild(this.$footer);
    this.$footer.appendChild(this.$doneBtn);
    return this.$container;
  }
}
export default SalesDetail;
