import { app, role } from "../../util/const.js";
import { formatDateTime } from "../../util/util.js";
import BookingDetail from "./BookingDetail.js";

class BookingItem {
  constructor(data) {
    this.data = data;
    this.$tr = document.createElement("div");
    this.$tr.className = "row mx-0 p-2";

    this.$sale = document.createElement("div");
    this.$sale.className = "col text-truncate";
    this.$saleText = document.createElement("p");
    this.$saleText.className = "m-0";
    this.$saleText.innerHTML = data.sale_create;

    this.$name = document.createElement("div");
    this.$name.className = "col text-truncate";
    this.$nameText = document.createElement("p");
    this.$nameText.className = "m-0";
    this.$nameText.innerHTML = data.contact_name;

    this.$phonenumber = document.createElement("div");
    this.$phonenumber.className = "col text-truncate";
    this.$phonenumberText = document.createElement("p");
    this.$phonenumberText.className = "m-0";
    this.$phonenumberText.innerHTML = data.phone_1;

    this.$city = document.createElement("div");
    this.$city.className = "col text-truncate";
    this.$cityText = document.createElement("p");
    this.$cityText.className = "m-0";
    this.$cityText.innerHTML = data.city;

    this.$appointmentDate = document.createElement("div");
    this.$appointmentDate.className = "col text-truncate";
    this.$appointmentDateText = document.createElement("p");
    this.$appointmentDateText.className = "m-0";
    this.$appointmentDateText.innerHTML = formatDateTime(data.booking_date);

    this.$validDate = document.createElement("div");
    this.$validDate.className = "col text-truncate";
    this.$validDateText = document.createElement("p");
    this.$validDateText.className = "m-0";
    this.$validDateText.innerHTML = formatDateTime(data.day_expire);

    this.$validStatus = document.createElement("div");
    this.$validStatus.className = "col text-truncate";
    this.$validStatusText = document.createElement("p");
    this.$validStatusText.className = "m-0";
    this.$validStatusText.innerHTML = data.effect;

    this.$user = document.createElement("div");
    this.$user.className = "col text-truncate";
    this.$userText = document.createElement("p");
    this.$userText.className = "m-0";
    this.$userText.innerHTML = data.name_user_seeding;

    this.$viewMore = document.createElement("div");
    this.$viewMore.className = "col text-truncate";
    this.$viewMore.addEventListener("click", () => {
      this.openBookingDetail();
    });
    this.$viewMoreText = document.createElement("button");
    this.$viewMoreText.className = "p-0 btn btn-link";
    this.$viewMoreText.innerHTML = "Xem thêm";

    this.$bookingDetail = new BookingDetail({
      closeBookingDetail: this.closeBookingDetail,
      data: this.data
    });
  }
  openBookingDetail = () => {
    app.appendChild(this.$bookingDetail.render());
  };
  closeBookingDetail = () => {
    app.removeChild(this.$bookingDetail.render());
  };
  render() {
    this.$tr.appendChild(this.$sale);
    this.$sale.appendChild(this.$saleText);

    this.$tr.appendChild(this.$name);
    this.$name.appendChild(this.$nameText);

    this.$tr.appendChild(this.$phonenumber);
    this.$phonenumber.appendChild(this.$phonenumberText);

    this.$tr.appendChild(this.$city);
    this.$city.appendChild(this.$cityText);

    this.$tr.appendChild(this.$appointmentDate);
    this.$appointmentDate.appendChild(this.$appointmentDateText);

    this.$tr.appendChild(this.$validDate);
    this.$validDate.appendChild(this.$validDateText);

    this.$tr.appendChild(this.$validStatus);
    this.$validStatus.appendChild(this.$validStatusText);

    if (role === "admin") {
      this.$tr.appendChild(this.$user);
      this.$user.appendChild(this.$userText);
    }

    this.$tr.appendChild(this.$viewMore);
    this.$viewMore.appendChild(this.$viewMoreText);

    return this.$tr;
  }
}
export default BookingItem;
