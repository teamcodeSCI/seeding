class DuplicateItem {
  constructor() {
    this.$tr = document.createElement("div");
    this.$tr.className = "row mx-0 p-2 position-relative";
    this.$tr.style.opacity = "active_user";

    this.$bookingCode = document.createElement("div");
    this.$bookingCode.className = "col text-truncate";
    this.$bookingCodeText = document.createElement("p");
    this.$bookingCodeText.className = "m-0";
    this.$bookingCodeText.innerHTML = `Mã booking`;

    this.$name = document.createElement("div");
    this.$name.className = "col text-truncate";
    this.$nameText = document.createElement("p");
    this.$nameText.className = "m-0";
    this.$nameText.innerHTML = `Tên khách hàng`;

    this.$phonenumber = document.createElement("div");
    this.$phonenumber.className = "col text-truncate";
    this.$phonenumberText = document.createElement("p");
    this.$phonenumberText.className = "m-0";
    this.$phonenumberText.innerHTML = `Số điện thoại`;

    this.$service = document.createElement("div");
    this.$service.className = "col text-truncate";
    this.$serviceText = document.createElement("p");
    this.$serviceText.className = "m-0";
    this.$serviceText.innerHTML = `Dịch vụ`;

    this.$seedingUser = document.createElement("div");
    this.$seedingUser.className = "col text-truncate";
    this.$seedingUserText = document.createElement("p");
    this.$seedingUserText.className = "m-0";
    this.$seedingUserText.innerHTML = `Nhân viên seeding`;

    this.$saleUser = document.createElement("div");
    this.$saleUser.className = "col text-truncate";
    this.$saleUserText = document.createElement("p");
    this.$saleUserText.className = "m-0";
    this.$saleUserText.innerHTML = `Nhân viên sale`;

    this.$date = document.createElement("div");
    this.$date.className = "col text-truncate";
    this.$dateText = document.createElement("p");
    this.$dateText.className = "m-0";
    this.$dateText.innerHTML = `Ngày`;
  }
  render() {
    this.$tr.appendChild(this.$bookingCode);
    this.$bookingCode.appendChild(this.$bookingCodeText);

    this.$tr.appendChild(this.$name);
    this.$name.appendChild(this.$nameText);

    this.$tr.appendChild(this.$phonenumber);
    this.$phonenumber.appendChild(this.$phonenumberText);

    this.$tr.appendChild(this.$service);
    this.$service.appendChild(this.$serviceText);

    this.$tr.appendChild(this.$seedingUser);
    this.$seedingUser.appendChild(this.$seedingUserText);

    this.$tr.appendChild(this.$saleUser);
    this.$saleUser.appendChild(this.$saleUserText);

    this.$tr.appendChild(this.$date);
    this.$date.appendChild(this.$dateText);

    return this.$tr;
  }
}
export default DuplicateItem;
