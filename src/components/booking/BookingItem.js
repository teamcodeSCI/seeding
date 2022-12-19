import { app } from "../../util/const.js"
import BookingDetail from "./BookingDetail.js"

class BookingItem {
    constructor({ name, phonenumber, nameFb, service, branch }) {
        this.data = {
            name: name,
            phonenumber: phonenumber,
            nameFb: nameFb,
            service: service,
            branch: branch
        }
        this.$tr = document.createElement('div')
        this.$tr.className = 'row mx-0 p-2'

        this.$name = document.createElement('div')
        this.$name.className = 'col text-truncate'
        this.$nameText = document.createElement('p')
        this.$nameText.className = 'm-0'
        this.$nameText.innerHTML = name

        this.$phonenumber = document.createElement('div')
        this.$phonenumber.className = 'col text-truncate'
        this.$phonenumberText = document.createElement('p')
        this.$phonenumberText.className = 'm-0'
        this.$phonenumberText.innerHTML = phonenumber

        this.$city = document.createElement('div')
        this.$city.className = 'col text-truncate'
        this.$cityText = document.createElement('p')
        this.$cityText.className = 'm-0'
        this.$cityText.innerHTML = `Tỉnh/ Thành phố`

        this.$appointmentDate = document.createElement('div')
        this.$appointmentDate.className = 'col text-truncate'
        this.$appointmentDateText = document.createElement('p')
        this.$appointmentDateText.className = 'm-0'
        this.$appointmentDateText.innerHTML = nameFb

        this.$validDate = document.createElement('div')
        this.$validDate.className = 'col text-truncate'
        this.$validDateText = document.createElement('p')
        this.$validDateText.className = 'm-0'
        this.$validDateText.innerHTML = service

        this.$validStatus = document.createElement('div')
        this.$validStatus.className = 'col text-truncate'
        this.$validStatusText = document.createElement('p')
        this.$validStatusText.className = 'm-0'
        this.$validStatusText.innerHTML = branch

        this.$viewMore = document.createElement('div')
        this.$viewMore.className = 'col text-truncate'
        this.$viewMore.addEventListener('click', () => {
            this.openBookingDetail()
        })
        this.$viewMoreText = document.createElement('button')
        this.$viewMoreText.className = 'p-0 btn btn-link'
        this.$viewMoreText.innerHTML = 'Xem thêm'

        this.$bookingDetail = new BookingDetail({
            closeBookingDetail: this.closeBookingDetail
        })
    }
    openBookingDetail = () => {
        app.appendChild(this.$bookingDetail.render())
    }
    closeBookingDetail = () => {
        app.removeChild(this.$bookingDetail.render())
    }
    render() {
        this.$tr.appendChild(this.$name)
        this.$name.appendChild(this.$nameText)

        this.$tr.appendChild(this.$phonenumber)
        this.$phonenumber.appendChild(this.$phonenumberText)

        this.$tr.appendChild(this.$city)
        this.$city.appendChild(this.$cityText)

        this.$tr.appendChild(this.$appointmentDate)
        this.$appointmentDate.appendChild(this.$appointmentDateText)

        this.$tr.appendChild(this.$validDate)
        this.$validDate.appendChild(this.$validDateText)

        this.$tr.appendChild(this.$validStatus)
        this.$validStatus.appendChild(this.$validStatusText)

        this.$tr.appendChild(this.$viewMore)
        this.$viewMore.appendChild(this.$viewMoreText)

        return this.$tr
    }
}
export default BookingItem