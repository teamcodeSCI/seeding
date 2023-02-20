import { arrToStr, formatDate, formatNumber } from "../../util/util.js"
import BookingDetailItem from "./BookingDetailItem.js"

class BookingDetail {
    constructor({ closeBookingDetail, data }) {
        this.closeBookingDetail = closeBookingDetail
        this.$container = document.createElement('div')
        this.$container.className = `modal d-flex align-items-center justify-content-center`
        this.$container.style.background = 'rgba(0,0,0,0.7)'

        this.$dialog = document.createElement('div')
        this.$dialog.className = `modal-dialog`
        this.$dialog.style.maxWidth = "700px"

        this.$dialog.style.width = "90%"

        this.$content = document.createElement('div')
        this.$content.className = `modal-content`

        this.$header = document.createElement('div')
        this.$header.className = `modal-header`

        this.$title = document.createElement('h5')
        this.$title.className = `modal-title`
        this.$title.innerHTML = `Chi tiết`

        this.$closeBtn = document.createElement('button')
        this.$closeBtn.className = `btn-close`
        this.$closeBtn.addEventListener('click', () => {
            closeBookingDetail()
        })

        this.$body = document.createElement('div')
        this.$body.className = `modal-body p-0 bg-white d-flex align-items-start flex-wrap overflow-auto`
        this.$body.style.maxHeight = '500px'
        this.$body.style.borderRadius = `0 0 var(--bs-modal-inner-border-radius) var(--bs-modal-inner-border-radius)`

        this.$infoBox = document.createElement('div')
        this.$infoBox.className = 'w-100 mb-3'

        this.$infoTitle = document.createElement('div')
        this.$infoTitle.className = 'bg-light fs-6 px-3 py-1 mb-3 d-flex align-items-center gap-2'

        this.$infoIcon = document.createElement('i')
        this.$infoIcon.className = 'bi bi-person-fill fs-5'

        this.$infoText = document.createElement('span')
        this.$infoText.className = 'fw-bold'
        this.$infoText.innerHTML = 'Thông tin cá nhân'

        this.$info = document.createElement("div");
        this.$info.className = `d-flex flex-column px-3`;
        this.$info.style.gap = '0.3rem'

        this.$bookingBox = document.createElement('div')
        this.$bookingBox.className = `mb-3`;
        this.$bookingBox.style.width = window.innerWidth >= 600 ? '50%' : '100%'

        this.$bookingTitle = document.createElement('div')
        this.$bookingTitle.className = 'bg-light fs-6 px-3 py-1 mb-3 d-flex align-items-center gap-2'

        this.$bookingIcon = document.createElement('i')
        this.$bookingIcon.className = 'bi bi-bookmark-fill fs-5'

        this.$bookingText = document.createElement('span')
        this.$bookingText.className = 'fw-bold'
        this.$bookingText.innerHTML = 'Booking'

        this.$booking = document.createElement("div");
        this.$booking.className = `d-flex flex-column px-3`;
        this.$booking.style.gap = '0.3rem'

        this.$companyBox = document.createElement('div')
        this.$companyBox.style.width = window.innerWidth >= 600 ? '50%' : '100%'

        this.$companyTitle = document.createElement('div')
        this.$companyTitle.className = 'bg-light fs-6 px-3 py-1 mb-3 d-flex align-items-center gap-2'

        this.$companyIcon = document.createElement('i')
        this.$companyIcon.className = 'bi bi-building-fill fs-5'

        this.$companyText = document.createElement('span')
        this.$companyText.className = 'fw-bold'
        this.$companyText.innerHTML = 'Thương hiệu'

        this.$company = document.createElement("div");
        this.$company.className = `d-flex flex-column px-3`;
        this.$company.style.gap = '0.3rem'

        this.$footer = document.createElement('div')
        this.$footer.className = `modal-footer`

        this.$doneBtn = document.createElement('button')
        this.$doneBtn.className = 'btn btn-primary'
        this.$doneBtn.innerHTML = 'Xong'
        this.$doneBtn.addEventListener('click', () => {
            closeBookingDetail()
        })

        this.$name = new BookingDetailItem({ title: 'Họ tên', value: data.contact_name })
        this.$phonenumber1 = new BookingDetailItem({ title: 'Điện thoại 1', value: data.phone_1 })
        this.$phonenumber2 = new BookingDetailItem({ title: 'Điện thoại 2', value: data.phone_2 })
        this.$city = new BookingDetailItem({ title: 'Tỉnh/TP', value: data.city })
        this.$appointmentDate = new BookingDetailItem({ title: 'Ngày hẹn lịch', value: formatDate(data.booking_date) })
        this.$validDate = new BookingDetailItem({ title: 'Hiệu lực đến ngày', value: formatDate(data.day_expire) })
        this.$validStatus = new BookingDetailItem({ title: 'Trạng thái hiệu lực', value: data.effect })

        this.$bookingCode = new BookingDetailItem({ title: 'Mã booking', value: data.code_booking })
        this.$service = new BookingDetailItem({ title: 'Dịch vụ', value: arrToStr(data.line_ids) })
        this.$unitPrice = new BookingDetailItem({ title: 'Đơn giá', value: `${data.dongia} đ` })
        this.$prepayment = new BookingDetailItem({ title: 'Tiền trước giảm', value: `${formatNumber(data.tien_truoc_giam)} đ` })
        this.$receivable = new BookingDetailItem({ title: 'Tiền phải thu', value: `${formatNumber(data.tien_phai_thu)} đ` })
        this.$received = new BookingDetailItem({ title: 'Tiền đã thu', value: `${formatNumber(data.tien_da_thu)} đ` })

        this.$brand = new BookingDetailItem({ title: 'Thương hiệu', value: data.brand })
        this.$branch = new BookingDetailItem({ title: 'Chi nhánh', value: data.company })
        this.$note = new BookingDetailItem({ title: 'Ghi chú', value: data.note })
    }
    render() {

        this.$container.appendChild(this.$dialog)
        this.$dialog.appendChild(this.$content)

        this.$content.appendChild(this.$header)
        this.$content.appendChild(this.$body)

        this.$header.appendChild(this.$title)
        this.$header.appendChild(this.$closeBtn)

        this.$body.appendChild(this.$infoBox)
        this.$body.appendChild(this.$bookingBox)
        this.$body.appendChild(this.$companyBox)

        this.$infoBox.appendChild(this.$infoTitle)
        this.$infoBox.appendChild(this.$info)

        this.$infoTitle.appendChild(this.$infoIcon)
        this.$infoTitle.appendChild(this.$infoText)

        this.$info.appendChild(this.$name.render())
        this.$info.appendChild(this.$phonenumber1.render())
        this.$info.appendChild(this.$phonenumber2.render())
        this.$info.appendChild(this.$city.render())
        this.$info.appendChild(this.$appointmentDate.render())
        this.$info.appendChild(this.$validDate.render())
        this.$info.appendChild(this.$validStatus.render())

        this.$bookingBox.appendChild(this.$bookingTitle)
        this.$bookingBox.appendChild(this.$booking)

        this.$bookingTitle.appendChild(this.$bookingIcon)
        this.$bookingTitle.appendChild(this.$bookingText)

        this.$booking.appendChild(this.$bookingCode.render())
        this.$booking.appendChild(this.$service.render())
        this.$booking.appendChild(this.$unitPrice.render())
        this.$booking.appendChild(this.$prepayment.render())
        this.$booking.appendChild(this.$receivable.render())
        this.$booking.appendChild(this.$received.render())

        this.$companyBox.appendChild(this.$companyTitle)
        this.$companyBox.appendChild(this.$company)

        this.$companyTitle.appendChild(this.$companyIcon)
        this.$companyTitle.appendChild(this.$companyText)

        this.$company.appendChild(this.$brand.render())
        this.$company.appendChild(this.$branch.render())
        this.$company.appendChild(this.$note.render())

        this.$content.appendChild(this.$footer)
        this.$footer.appendChild(this.$doneBtn)
        return this.$container
    }
}
export default BookingDetail