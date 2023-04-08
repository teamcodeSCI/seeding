import { role } from "../../util/const.js";
import BookingItem from "./BookingItem.js";

class BookingList {
  constructor({ data }) {
    this.data = data;
    this.$container = document.createElement("div");
    this.$container.className = `table-responsive dataTable`;
    this.$container.style.fontSize = "15px";

    this.$theadTr = document.createElement("div");
    this.$theadTr.className =
      "row bg-light bg-gradient p-2 mx-0 flex-nowrap border-bottom";

    this.$sale = document.createElement("div");
    this.$sale.className = "col text-truncate";
    this.$saleText = document.createElement("p");
    this.$saleText.className = "m-0 fw-bold";
    this.$saleText.innerHTML = `NV Sale`;

    this.$name = document.createElement("div");
    this.$name.className = "col text-truncate";
    this.$nameText = document.createElement("p");
    this.$nameText.className = "m-0 fw-bold";
    this.$nameText.innerHTML = `Họ và tên`;

    this.$phonenumber = document.createElement("div");
    this.$phonenumber.className = "col text-truncate";
    this.$phonenumberText = document.createElement("p");
    this.$phonenumberText.className = "m-0 fw-bold";
    this.$phonenumberText.innerHTML = `Điện thoại`;

    this.$city = document.createElement("div");
    this.$city.className = "col text-truncate";
    this.$cityText = document.createElement("p");
    this.$cityText.className = "m-0 fw-bold";
    this.$cityText.innerHTML = `Tỉnh/ Thành phố`;

    this.$appointmentDate = document.createElement("div");
    this.$appointmentDate.className = "col text-truncate";
    this.$appointmentDateText = document.createElement("p");
    this.$appointmentDateText.className = "m-0 fw-bold";
    this.$appointmentDateText.innerHTML = `Ngày hẹn lịch`;

    this.$validDate = document.createElement("div");
    this.$validDate.className = "col text-truncate";
    this.$validDateText = document.createElement("p");
    this.$validDateText.className = "m-0 fw-bold";
    this.$validDateText.innerHTML = `Hiệu lực đến ngày`;

    this.$validStatus = document.createElement("div");
    this.$validStatus.className = "col text-truncate";
    this.$validStatusText = document.createElement("p");
    this.$validStatusText.className = "m-0 fw-bold";
    this.$validStatusText.innerHTML = `Trạng thái hiệu lực`;

    this.$user = document.createElement("div");
    this.$user.className = "col text-truncate";
    this.$userText = document.createElement("p");
    this.$userText.className = "m-0 fw-bold";
    this.$userText.innerHTML = `Nhân viên`;

    this.$viewMore = document.createElement("div");
    this.$viewMore.className = "col text-truncate";
    this.$viewMoreText = document.createElement("p");
    this.$viewMoreText.className = "m-0 fw-bold";
    this.$viewMoreText.innerHTML = `Xem thêm`;

    this.$tbody = document.createElement("div");
    this.$tbody.className = "bg-item";

    this.getAllBookings();
  }
  getAllBookings = () => {
    this.$tbody.innerHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      this.$item = new BookingItem({
        ...this.data[i]
      });
      this.$tbody.appendChild(this.$item.render());
    }
    return this.$tbody;
  };

  render() {
    this.$container.appendChild(this.$theadTr);
    this.$container.appendChild(this.$tbody);

    this.$theadTr.appendChild(this.$sale);
    this.$sale.appendChild(this.$saleText);

    this.$theadTr.appendChild(this.$name);
    this.$name.appendChild(this.$nameText);

    this.$theadTr.appendChild(this.$phonenumber);
    this.$phonenumber.appendChild(this.$phonenumberText);

    this.$theadTr.appendChild(this.$city);
    this.$city.appendChild(this.$cityText);

    this.$theadTr.appendChild(this.$appointmentDate);
    this.$appointmentDate.appendChild(this.$appointmentDateText);

    this.$theadTr.appendChild(this.$validDate);
    this.$validDate.appendChild(this.$validDateText);

    this.$theadTr.appendChild(this.$validStatus);
    this.$validStatus.appendChild(this.$validStatusText);

    if (role === "admin") {
      this.$theadTr.appendChild(this.$user);
      this.$user.appendChild(this.$userText);
    }

    this.$theadTr.appendChild(this.$viewMore);
    this.$viewMore.appendChild(this.$viewMoreText);

    return this.$container;
  }
}
export default BookingList;
