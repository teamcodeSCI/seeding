import { role } from "../../util/const.js";
import InputGroup from "../InputGroup.js";


class BookingSearchModal {
    constructor({ closeBookingSearchModal, setSearchValue }) {
        this.setSearchValue = setSearchValue;
        this.closeBookingSearchModal = closeBookingSearchModal;
        this.$container = document.createElement("div");
        this.$container.className = `modal d-flex align-items-center justify-content-center`;
        this.$container.style.background = "rgba(0,0,0,0.7)";

        this.$dialog = document.createElement("div");
        this.$dialog.className = `modal-dialog`;
        this.$dialog.style.maxWidth = "650px";
        this.$dialog.style.width = "90%";

        this.$content = document.createElement("div");
        this.$content.className = `modal-content`;

        this.$header = document.createElement("div");
        this.$header.className = `modal-header`;

        this.$title = document.createElement("h5");
        this.$title.className = `modal-title`;
        this.$title.innerHTML = `Tìm kiếm`;

        this.$closeBtn = document.createElement("button");
        this.$closeBtn.className = `btn-close`;
        this.$closeBtn.addEventListener("click", () => {
            this.closeBookingSearchModal();
        });

        this.$body = document.createElement("div");
        this.$body.className = `modal-body p-4`;

        this.$line = document.createElement("div");
        this.$line.className = "my-3";
        this.$line.style.backgroundColor = " #ced4da";
        this.$line.style.height = "1px";

        this.$border = document.createElement("div");
        this.$border.className = `bg-white d-flex justify-content-between gap-3 flex-column`;

        this.$advance = document.createElement("div");
        this.$advance.className = `bg-white d-flex justify-content-between flex-wrap gap-3`;

        this.$footer = document.createElement("div");
        this.$footer.className = `modal-footer`;

        this.$search = document.createElement("button");
        this.$search.className = "btn btn-primary";
        this.$search.innerHTML = "Tìm kiếm";
        this.$search.addEventListener("click", () => {
            this.search();
        });

        this.$searchName = new InputGroup({ placeholder: "Họ Tên" });
        this.$phone = new InputGroup({ placeholder: "Số điện thoại" });
        this.$bookingCode = new InputGroup({ placeholder: "Mã booking" });

        this.$user = new InputGroup({ placeholder: "Nhân viên" });

        this.$startDate = new InputGroup({
            placeholder: "Từ",
            title: "Từ",
            type: "date",
            width: "48%"
        });
        this.$endDate = new InputGroup({
            placeholder: "Đến",
            title: "Đến",
            type: "date",
            width: "48%"
        });


    }


    search = () => {
        this.setSearchValue(
            this.$searchName.getValue().value,
            this.$phone.getValue().value,
            this.$bookingCode.getValue().value,
            this.$user.getValue().value,
            this.$startDate.getValue().value,
            this.$endDate.getValue().value
        );
        this.closeBookingSearchModal();
    };
    render() {
        this.$container.appendChild(this.$dialog);
        this.$dialog.appendChild(this.$content);
        this.$content.appendChild(this.$header);
        this.$header.appendChild(this.$title);
        this.$header.appendChild(this.$closeBtn);
        this.$content.appendChild(this.$body);
        this.$body.appendChild(this.$border);
        this.$body.appendChild(this.$line);
        this.$body.appendChild(this.$advance);

        this.$border.appendChild(this.$searchName.render());
        this.$border.appendChild(this.$phone.render());
        this.$border.appendChild(this.$bookingCode.render());

        if (role === 'admin') this.$border.appendChild(this.$user.render());

        this.$advance.appendChild(this.$startDate.render());
        this.$advance.appendChild(this.$endDate.render());

        this.$content.appendChild(this.$footer);

        this.$footer.appendChild(this.$search);

        return this.$container;
    }
}
export default BookingSearchModal;