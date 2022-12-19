import InputGroup from "../InputGroup.js"
import Textarea from "../Textarea.js"

class LeadAddModal {
    constructor({ closeLeadAddModal }) {
        this.closeLeadAddModal = closeLeadAddModal
        this.$container = document.createElement('div')
        this.$container.className = `modal d-flex align-items-center justify-content-center`
        this.$container.style.background = 'rgba(0,0,0,0.7)'

        this.$dialog = document.createElement('div')
        this.$dialog.className = `modal-dialog`
        this.$dialog.style.maxWidth = "650px"
        this.$dialog.style.width = "90%"

        this.$content = document.createElement('div')
        this.$content.className = `modal-content`

        this.$header = document.createElement('div')
        this.$header.className = `modal-header`

        this.$title = document.createElement('h5')
        this.$title.className = `modal-title`
        this.$title.innerHTML = `Thêm thông tin`

        this.$closeBtn = document.createElement('button')
        this.$closeBtn.className = `btn-close`
        this.$closeBtn.addEventListener('click', () => {
            this.closeLeadAddModal()
        })

        this.$body = document.createElement('div')
        this.$body.className = `modal-body p-4`

        this.$border = document.createElement("div");
        this.$border.className = `bg-white d-flex justify-content-between flex-wrap gap-3`;

        this.$footer = document.createElement('div')
        this.$footer.className = `modal-footer`

        this.$saveBtn = document.createElement('button')
        this.$saveBtn.className = 'btn btn-primary'
        this.$saveBtn.innerHTML = 'Thêm mới'
        this.$saveBtn.addEventListener('click', () => {
            this.clickSave()
        })
        this.$name = new InputGroup({ placeholder: "Họ và tên", width: '48%' });
        this.$phone = new InputGroup({ placeholder: "Điện thoại", width: '48%' });
        this.$nameFb = new InputGroup({ placeholder: "Tên FB", width: '48%' });
        this.$linkFb = new InputGroup({ placeholder: "Link FB", width: '48%' });
        this.$service = new InputGroup({ placeholder: "Dịch vụ đăng ký", width: '48%' });
        this.$branch = new InputGroup({ placeholder: "Chi nhánh", width: '48%' });
        this.$script = new InputGroup({ placeholder: "Kịch bản", width: '48%' });
        this.$interactive = new InputGroup({ placeholder: "Tương tác", width: '48%' });

        this.$note = new Textarea({ palaceHolder: 'Ghi chú' })
    }

    clickSave = () => {
        if (this.$name.getValue() === '' || this.$phone.getValue() === '' || this.$nameFb.getValue() === '' || this.$linkFb.getValue() === '' || this.$service.getValue() === '' || this.$branch.getValue() === '') {
            this.$name.fail()
            this.$phone.fail()
            this.$nameFb.fail()
            this.$linkFb.fail()
            this.$service.fail()
            this.$branch.fail()
            return
        }
        this.$name.success()
        this.$phone.success()
        this.$nameFb.success()
        this.$linkFb.success()
        this.$service.success()
        this.$branch.success()
        this.closeLeadAddModal()
    }
    render() {
        this.$container.appendChild(this.$dialog)
        this.$dialog.appendChild(this.$content)
        this.$content.appendChild(this.$header)
        this.$header.appendChild(this.$title)
        this.$header.appendChild(this.$closeBtn)
        this.$content.appendChild(this.$body)
        this.$body.appendChild(this.$border)

        this.$border.appendChild(this.$name.render())
        this.$border.appendChild(this.$phone.render())
        this.$border.appendChild(this.$nameFb.render())
        this.$border.appendChild(this.$linkFb.render())
        this.$border.appendChild(this.$service.render())
        this.$border.appendChild(this.$branch.render())
        this.$border.appendChild(this.$script.render())
        this.$border.appendChild(this.$interactive.render())
        this.$border.appendChild(this.$note.render())

        this.$content.appendChild(this.$footer)
        this.$footer.appendChild(this.$saveBtn)
        return this.$container
    }
}
export default LeadAddModal