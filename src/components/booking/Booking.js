import BookingList from "./BookingList.js";
import Pagination from "../Pagination.js";

import { formatDate, loading } from "../../util/util.js"

import { app } from "../../util/const.js";
import { getLead } from "../../apis/lead.js";
import LeadSearchModal from "../Lead/LeadSearchModal.js";
import Tag from "../Tag.js";

class Booking {
    tagTitle = ''
    searchName = ''
    searchPhone = ''
    searchService = ''
    searchFb = ''
    searchBranch = ''
    startDate = ''
    endDate = ''
    index = 1
    isLoading = false
    constructor() {
        this.$dataTable = document.createElement('div')
        this.$dataTable.className = `datatable px-3 py-4 bg-white`;

        this.$action = document.createElement('div')
        this.$action.className = `d-flex justify-content-between gap-3`

        this.$actionLeft = document.createElement('div')
        this.$actionLeft.className = `d-flex gap-2`

        this.$searchBtn = document.createElement('button')
        this.$searchBtn.className = `btn btn-primary d-flex gap-2 justify-content-between`
        this.$searchBtn.addEventListener('click', () => {
            this.openLeadSearchModal()
        })
        this.$reset = document.createElement('button')
        this.$reset.className = 'btn btn-danger'
        this.$reset.innerHTML = 'Xóa bộ lọc'
        this.$reset.addEventListener('click', () => {
            this.reset()
        })

        this.$desc = document.createElement('p')
        this.$desc.style.margin = '12px 0'

        this.$title = document.createElement('b')
        this.$title.className = 'd-block'

        this.$tagGroup = document.createElement('span')
        this.$tagGroup.className = 'd-flex gap-2'

        this.$table = document.createElement('div')

        this.$searchText = document.createElement('span')
        this.$searchText.innerHTML = 'Tìm kiếm'
        this.$searchIcon = document.createElement('i')
        this.$searchIcon.className = `bi bi-search`

        this.$searchModal = new LeadSearchModal({ closeLeadSearchModal: this.closeLeadSearchModal, reset: this.reset, setSearchValue: this.setSearchValue })

        this.$pagiBox = document.createElement('div')
        this.$pagiBox.className = `mt-3`

        this.getAllBooking()
    }
    openLeadSearchModal = () => {
        app.appendChild(this.$searchModal.render())
    }
    closeLeadSearchModal = () => {
        app.removeChild(this.$searchModal.render())
    }
    setIndex = (index) => {
        this.index = index
    }
    reset = () => {
        this.setSearchValue()
        this.$actionLeft.removeChild(this.$reset)
        this.$title.innerHTML = ''
    }
    setSearchValue = (name, phone, service, fb, branch, startDate, endDate) => {
        this.searchName = name || ''
        this.searchPhone = phone || ''
        this.searchService = service || ''
        this.searchFb = fb || ''
        this.searchBranch = branch || ''
        this.startDate = startDate || ''
        this.endDate = endDate || ''
        this.$tagGroup.innerHTML = ''
        this.inputGroup = [this.searchName, this.searchPhone, this.searchService, this.searchFb, this.searchBranch, this.startDate, this.endDate]

        for (let i = 0; i < this.inputGroup.length; i++) {
            if (this.inputGroup[i] !== '') {
                switch (i) {
                    case 0:
                        this.tagTitle = `Họ tên: ${this.inputGroup[i]}`
                        break;
                    case 1:
                        this.tagTitle = `Số điện thoại: ${this.inputGroup[i]}`
                        break;
                    case 2:
                        this.tagTitle = `Dịch vụ: ${this.inputGroup[i]}`
                        break;
                    case 3:
                        this.tagTitle = `Tên FB: ${this.inputGroup[i]}`
                        break;
                    case 4:
                        this.tagTitle = `Chi nhánh: ${this.inputGroup[i]}`
                        break;
                    case 5:
                        this.tagTitle = `Ngày bắt đầu: ${formatDate(this.inputGroup[i])}`
                        break;
                    case 6:
                        this.tagTitle = `Ngày kết thúc: ${formatDate(this.inputGroup[i])}`
                        break;
                    default:
                        break;
                }
                this.$tag = new Tag(this.tagTitle)
                this.$tagGroup.appendChild(this.$tag.render())
                this.$actionLeft.appendChild(this.$reset)
                this.$title.innerHTML = 'Kết quả tìm kiếm cho: '
            }
        }
        this.setIndex(1)
        this.getAllBooking()
    }
    getAllBooking = async() => {
        try {
            // loading(true)
            const res = await getLead({
                    pageNum: this.index,
                    name: this.searchName,
                    phone: this.searchPhone,
                    service: this.searchService,
                    fb: this.searchFb,
                    branch: this.searchBranch,
                    startDate: this.startDate,
                    endDate: this.endDate
                })
                // loading(false)

            this.$bookingList = new BookingList({ data: res.render })
            this.$pagination = new Pagination({ count: res.pageCount, index: this.index, setIndex: this.setIndex, getAllData: this.getAllBooking })
            if (res.pageCount === 0) {
                this.$table.className = 'text-center';
                this.$table.innerHTML = 'Không có dữ liệu';
                this.$pagiBox.innerHTML = ''
                return
            }
            this.$table.innerHTML = ''
            this.$table.className = 'text-start';
            this.$table.appendChild(this.$bookingList.render());

            this.$pagiBox.innerHTML = ''
            this.$pagiBox.appendChild(this.$pagination.render());


        } catch (e) {
            console.log(e);
            return
        }
    }

    render() {
        this.$searchBtn.appendChild(this.$searchText)
        this.$searchBtn.appendChild(this.$searchIcon)

        this.$desc.appendChild(this.$title)
        this.$desc.appendChild(this.$tagGroup)

        this.$dataTable.appendChild(this.$action);
        this.$dataTable.appendChild(this.$desc)
        this.$action.appendChild(this.$actionLeft);
        this.$actionLeft.appendChild(this.$searchBtn);

        this.$dataTable.appendChild(this.$table);
        this.$dataTable.appendChild(this.$pagiBox);
        return this.$dataTable;
    }
}
export default Booking