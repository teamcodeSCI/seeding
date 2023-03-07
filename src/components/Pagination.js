class Pagination {
    constructor({ count, index, setIndex, getAllData }) {
        this.index = index //Vị trí hiện tại
        this.getAllData = getAllData // hàm lấy tất cả danh sách
        this.setIndex = setIndex // hàm set vị trí index
        this.dataLength = count //  đếm số phần tử của pagination
        this.limit = this.dataLength < 6 ? this.dataLength : 6 // giới hạn số phần tử của pagination 
        this.count = this.limit + this.index - 1 >= this.dataLength ? this.dataLength : this.limit + this.index - 1 // giới hạn phần tử lớn nhất được render của pagination
        this.$container = document.createElement('ul')
        this.$container.id = 'page2'
        this.$container.classList.add('pagination', 'justify-content-center')

        //nút Về đầu trang
        this.$firstPageBtn = document.createElement('li')
        this.$firstPageBtn.className = `page-item ${this.index <= 1 || this.dataLength === 0 ? 'd-none' : ''}`
        this.$firstPageBtn.style.cursor = 'pointer'
        this.$firstPageBtn.addEventListener('click', () => {
            this.firstPage()
        })
        this.$firstPageLink = document.createElement('span')
        this.$firstPageLink.classList.add('page-link')
        this.$firstPageLink.innerHTML = '&laquo;&laquo;'

        //nút Quay lại
        this.$preBtn = document.createElement('li')
        this.$preBtn.className = `page-item ${this.index <= 1 || this.dataLength === 0 ? 'd-none' : ''}`
        this.$preBtn.style.cursor = 'pointer'
        this.$preBtn.addEventListener('click', () => {
            this.prePage()
        })
        this.$preLink = document.createElement('span')
        this.$preLink.classList.add('page-link')
        this.$preLink.innerHTML = '&laquo;'

        //nút next
        this.$nextBtn = document.createElement('li')
        this.$nextBtn.className = `page-item ${this.index >= this.dataLength ?'d-none':''}`
        this.$nextBtn.style.cursor = 'pointer'
        this.$nextBtn.addEventListener('click', () => {
            this.nextPage()
        })
        this.$nextLink = document.createElement('span')
        this.$nextLink.classList.add('page-link')
        this.$nextLink.innerHTML = '&raquo;'

        //nút Về đầu trang
        this.$endBtn = document.createElement('li')
        this.$endBtn.className = `page-item ${this.index >= this.dataLength ?'d-none':''}`
        this.$endBtn.style.cursor = 'pointer'
        this.$endBtn.addEventListener('click', () => {
            this.endPage()
        })
        this.$endLink = document.createElement('span')
        this.$endLink.classList.add('page-link')
        this.$endLink.innerHTML = '&raquo;&raquo;'
    }
    firstPage() {
        this.setIndex(1)
        this.getAllData()
    }
    prePage() {
        this.index = this.index <= 1 ? 1 : this.index - 1
        this.setIndex(this.index)
        this.getAllData()
    }
    nextPage() {
        this.index = this.index >= this.limit + this.index - 1 ? this.dataLength : this.index + 1
        this.setIndex(this.index)
        this.getAllData()
    }
    endPage() {
        this.setIndex(this.dataLength)
        this.getAllData()
    }

    render() {
        this.$container.innerHTML = ''
        this.$container.appendChild(this.$firstPageBtn)
        this.$firstPageBtn.appendChild(this.$firstPageLink)
        this.$container.appendChild(this.$preBtn)
        this.$preBtn.appendChild(this.$preLink)

        //render số Phần tử 
        const numTemp = (number) => {
            this.$numBtn = document.createElement('li')
            this.$numBtn.className = `page-item ${this.index === number ? 'active' : ''}`

            this.$numLink = document.createElement('span')
            this.$numLink.classList.add('page-link')
            this.$numLink.setAttribute('role', 'button')
            this.$numLink.innerHTML = number

            this.$container.appendChild(this.$numBtn)
            this.$numBtn.appendChild(this.$numLink)
            this.$numBtn.addEventListener('click', () => {
                this.index = number
                this.setIndex(this.index)
                this.getAllData()
            })
        }
        for (let i = this.count === this.dataLength ? this.count - this.limit + 1 : this.index; i <= this.count; i++) {
            numTemp(i)
        }
        this.$container.appendChild(this.$nextBtn)
        this.$nextBtn.appendChild(this.$nextLink)

        this.$container.appendChild(this.$endBtn)
        this.$endBtn.appendChild(this.$endLink)
        return this.$container
    }

}
export default Pagination