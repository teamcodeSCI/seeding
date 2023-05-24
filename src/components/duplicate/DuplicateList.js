import DuplicateItem from "./DuplicateItem.js";

class DuplicateList {
  constructor({ data }) {
    this.data = data === "" ? [] : data;
    this.$container = document.createElement("div");
    this.$container.className = `table-responsive dataTable`;
    this.$container.style.fontSize = "14px";

    this.$theadTr = document.createElement("div");
    this.$theadTr.className =
      "row bg-light bg-gradient p-2 mx-0 flex-nowrap border-bottom";

    this.$bookingCode = document.createElement("div");
    this.$bookingCode.className = "col text-truncate";
    this.$bookingCodeText = document.createElement("p");
    this.$bookingCodeText.className = "m-0 fw-bold";
    this.$bookingCodeText.innerHTML = `Mã booking`;

    this.$name = document.createElement("div");
    this.$name.className = "col text-truncate";
    this.$nameText = document.createElement("p");
    this.$nameText.className = "m-0 fw-bold";
    this.$nameText.innerHTML = `Tên khách hàng`;

    this.$phonenumber = document.createElement("div");
    this.$phonenumber.className = "col text-truncate";
    this.$phonenumberText = document.createElement("p");
    this.$phonenumberText.className = "m-0 fw-bold";
    this.$phonenumberText.innerHTML = `Số điện thoại`;

    this.$service = document.createElement("div");
    this.$service.className = "col text-truncate";
    this.$serviceText = document.createElement("p");
    this.$serviceText.className = "m-0 fw-bold";
    this.$serviceText.innerHTML = `Dịch vụ`;

    this.$saleUser = document.createElement("div");
    this.$saleUser.className = "col text-truncate";
    this.$saleUserText = document.createElement("p");
    this.$saleUserText.className = "m-0 fw-bold";
    this.$saleUserText.innerHTML = `Nhân viên sale`;

    this.$sales = document.createElement("div");
    this.$sales.className = "col text-truncate";
    this.$salesText = document.createElement("p");
    this.$salesText.className = "m-0 fw-bold";
    this.$salesText.innerHTML = `Doanh số`;

    this.$tbody = document.createElement("div");
    this.$tbody.className = "bg-item";
    this.$tbody.style.maxHeight = "calc(100vh - 350px)";
    this.$tbody.style.overflowY = "auto";
  }
  renderItem = () => {
    this.$tbody.innerHTML = "";
    if (this.data.length === 0) {
      this.$tbody.style.marginTop = "20px";
      this.$tbody.style.textAlign = "center";
      this.$tbody.innerHTML = "Không có dữ liệu";
    } else {
      this.data.forEach((e) => {
        this.$item = new DuplicateItem({ ...e });
        this.$tbody.appendChild(this.$item.render());
      });
    }
  };
  render() {
    this.renderItem();
    this.$container.appendChild(this.$theadTr);
    this.$container.appendChild(this.$tbody);

    this.$theadTr.appendChild(this.$bookingCode);
    this.$bookingCode.appendChild(this.$bookingCodeText);

    this.$theadTr.appendChild(this.$name);
    this.$name.appendChild(this.$nameText);

    this.$theadTr.appendChild(this.$phonenumber);
    this.$phonenumber.appendChild(this.$phonenumberText);

    this.$theadTr.appendChild(this.$saleUser);
    this.$saleUser.appendChild(this.$saleUserText);

    this.$theadTr.appendChild(this.$sales);
    this.$sales.appendChild(this.$salesText);

    this.$theadTr.appendChild(this.$service);
    this.$service.appendChild(this.$serviceText);

    return this.$container;
  }
}
export default DuplicateList;
