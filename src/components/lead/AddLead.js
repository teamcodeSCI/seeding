import { app } from '../../util/const.js'
import LeadAddModal from './LeadAddModal.js'
class AddLead {
    constructor() {
        this.$container = document.createElement('div')
        this.$btnAddLead = document.createElement('button')
        this.$btnAddLead.className = `btn btn-primary d-flex gap-2 justify-content-between w-100`
        this.$btnAddLead.addEventListener('click', () => {
            this.openLeadAddModal()
        })
        this.$icon = document.createElement('i')
        this.$icon.className = `bi bi-plus-lg`

        this.$text = document.createElement('span')
        this.$text.innerHTML = 'Thêm mới'

        this.$modalAdd = new LeadAddModal({ closeLeadAddModal: this.closeLeadAddModal })
    }
    openLeadAddModal = () => {
        app.appendChild(this.$modalAdd.render())
    }
    closeLeadAddModal = () => {
        app.removeChild(this.$modalAdd.render())
    }
    render() {
        this.$container.appendChild(this.$btnAddLead)
        this.$btnAddLead.appendChild(this.$text)
        this.$btnAddLead.appendChild(this.$icon)
        return this.$container
    }
}
export default AddLead