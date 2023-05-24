import { app } from "../../util/const.js";
import SalesDetail from "./SalesDetail.js";
import ServiceDetail from "./ServiceDetail.js";

class DuplicateItem {
  constructor(data) {
    this.data = data;
    this.$tr = document.createElement("div");
    this.$tr.className = "row mx-0 p-2 position-relative";
    this.$tr.style.opacity = "active_user";

    this.$bookingCode = document.createElement("div");
    this.$bookingCode.className = "col text-truncate";
    this.$bookingCodeText = document.createElement("p");
    this.$bookingCodeText.className = "m-0";
    this.$bookingCodeText.innerHTML = data.bk_code;

    this.$name = document.createElement("div");
    this.$name.className = "col text-truncate";
    this.$nameText = document.createElement("p");
    this.$nameText.className = "m-0";
    this.$nameText.innerHTML = data.name;

    this.$phonenumber = document.createElement("div");
    this.$phonenumber.className = "col text-truncate";
    this.$phonenumberText = document.createElement("p");
    this.$phonenumberText.className = "m-0";
    this.$phonenumberText.innerHTML = data.phone_1;

    this.$service = document.createElement("div");
    this.$service.className = "col text-truncate";
    this.$service.addEventListener("click", () => {
      this.openServiceModal();
    });
    this.$serviceText = document.createElement("p");
    this.$serviceText.className = "m-0 btn btn-link p-0";
    this.$serviceText.style.fontSize = "14px";
    this.$serviceText.innerHTML =
      this.data.dich_vu.length !== 0 ? `Xem thêm` : "";

    this.$saleUser = document.createElement("div");
    this.$saleUser.className = "col text-truncate";
    this.$saleUserText = document.createElement("p");
    this.$saleUserText.className = "m-0";
    this.$saleUserText.innerHTML = data.sale_create;

    this.$sales = document.createElement("div");
    this.$sales.className = "col text-truncate";
    this.$sales.addEventListener("click", () => {
      this.openSalesModal();
    });
    this.$salesText = document.createElement("p");
    this.$salesText.className = "m-0 btn btn-link p-0";
    this.$salesText.innerHTML =
      this.data.doanh_so.length !== 0 ? `Xem thêm` : "";
    this.$salesText.style.fontSize = "14px";

    this.$serviceDetail = new ServiceDetail({
      closeServiceModal: this.closeServiceModal,
      data: data.dich_vu
    });
    this.$salesDetail = new SalesDetail({
      closeSalesModal: this.closeSalesModal,
      data: data.doanh_so
    });
  }
  openServiceModal = () => {
    if (this.data.dich_vu.length !== 0)
      app.appendChild(this.$serviceDetail.render());
  };
  closeServiceModal = () => {
    app.removeChild(this.$serviceDetail.render());
  };
  openSalesModal = () => {
    if (this.data.doanh_so.length !== 0)
      app.appendChild(this.$salesDetail.render());
  };
  closeSalesModal = () => {
    app.removeChild(this.$salesDetail.render());
  };
  render() {
    this.$tr.appendChild(this.$bookingCode);
    this.$bookingCode.appendChild(this.$bookingCodeText);

    this.$tr.appendChild(this.$name);
    this.$name.appendChild(this.$nameText);

    this.$tr.appendChild(this.$phonenumber);
    this.$phonenumber.appendChild(this.$phonenumberText);

    this.$tr.appendChild(this.$saleUser);
    this.$saleUser.appendChild(this.$saleUserText);

    this.$tr.appendChild(this.$sales);
    this.$sales.appendChild(this.$salesText);

    this.$tr.appendChild(this.$service);
    this.$service.appendChild(this.$serviceText);

    return this.$tr;
  }
}
export default DuplicateItem;
