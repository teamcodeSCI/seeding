import FilterItem from "./FilterItem.js";
class Filter {
    data = ['Tất cả', 'Kangnam', 'Paris', 'Hồng Hà', 'Đông Á']
    constructor({ filterSearch }) {
        this.filterSearch = filterSearch
        this.$container = document.createElement('div')
        this.$container.className = 'border-bottom position-relative'
        this.$container.style.minWidth = '100px'

        this.$filterBtn = document.createElement('button')
        this.$filterBtn.className = 'dropdown-toggle bg-white px-2 py-1 border-0 w-100'
        this.$filterBtn.innerHTML = 'Thương hiệu'
        this.$filterBtn.style.fontSize = '14px'
        this.$filterBtn.addEventListener('click', () => {
            this.openFilter()
        })

        this.$filterBox = document.createElement('ul')
        this.$filterBox.className = 'position-absolute w-100 list-group list-group-flush'
        this.$filterBox.style.top = '31px'
        this.$filterBox.style.fontSize = '14px'
        this.$filterBox.style.boxShadow = '1px 1px 2px 0px rgba(0,0,0,0.2)'
        this.renderItem()
    }
    selectItem = (val) => {
        this.$filterBtn.innerHTML = val
        this.filterSearch()
        this.closeFilter()
    }
    getValue = () => {
        return this.$filterBtn.innerHTML
    }
    openFilter = () => {
        if (this.$filterBox.parentElement !== this.$container) {
            this.$container.appendChild(this.$filterBox)
            return
        }
        this.$container.removeChild(this.$filterBox)
    }
    closeFilter = () => {
        this.$container.removeChild(this.$filterBox)

    }
    renderItem = () => {
        this.$filterBox.innerHTML = ''
        for (let item of this.data) {
            this.$item = new FilterItem({ title: item, selectItem: this.selectItem })
            this.$filterBox.appendChild(this.$item.render())
        }
    }
    render() {
        this.$container.appendChild(this.$filterBtn)
        return this.$container
    }
}
export default Filter