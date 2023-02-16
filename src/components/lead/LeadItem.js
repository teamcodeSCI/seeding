import { app } from "../../util/const.js"
import LeadEditModal from "./LeadEditModal.js"

class LeadItem {
    constructor({ name, phone, name_fb, link_fb, service, company_name, script, interactive_proof, note }) {
        this.data = {
            name: name,
            phone: phone,
            name_fb: name_fb,
            link_fb: link_fb,
            service: service,
            company_name: company_name,
            script: script,
            interactive_proof: interactive_proof,
            note: note,
        }

        this.$tr = document.createElement('div')
        this.$tr.className = 'row mx-0 p-2 position-relative'

        this.$name = document.createElement('div')
        this.$name.className = 'col text-truncate'
        this.$nameText = document.createElement('p')
        this.$nameText.className = 'm-0'
        this.$nameText.innerHTML = name

        this.$phonenumber = document.createElement('div')
        this.$phonenumber.className = 'col text-truncate'
        this.$phonenumberText = document.createElement('p')
        this.$phonenumberText.className = 'm-0'
        this.$phonenumberText.innerHTML = phone

        this.$linkFb = document.createElement('div')
        this.$linkFb.className = 'col text-truncate'
        this.$linkFbText = document.createElement('a')
        this.$linkFbText.className = 'm-0'
        this.$linkFbText.target = '_blank'
        this.$linkFbText.href = link_fb
        this.$linkFbText.innerHTML = name_fb

        this.$service = document.createElement('div')
        this.$service.className = 'col text-truncate'
        this.$serviceText = document.createElement('p')
        this.$serviceText.className = 'm-0'
        this.$serviceText.innerHTML = service

        this.$branch = document.createElement('div')
        this.$branch.className = 'col text-truncate'
        this.$branchText = document.createElement('p')
        this.$branchText.className = 'm-0'
        this.$branchText.innerHTML = company_name

        this.$script = document.createElement('div')
        this.$script.className = 'col text-truncate'
        this.$scriptText = document.createElement('p')
        this.$scriptText.className = 'm-0'
        this.$scriptText.innerHTML = script

        this.$interactive = document.createElement('div')
        this.$interactive.className = 'col text-truncate'
        this.$interactiveText = document.createElement('a')
        this.$interactiveText.href = interactive_proof
        this.$interactiveText.className = 'm-0'
        this.$interactiveText.target = '_blank'
        this.$interactiveText.innerHTML = 'Link ảnh'

        this.$note = document.createElement('div')
        this.$note.className = 'col text-truncate'
        this.$noteText = document.createElement('p')
        this.$noteText.className = 'm-0'
        this.$noteText.innerHTML = note

        this.$editBtn = document.createElement('button')
        this.$editBtn.className = 'position-absolute w-auto border-0 p-0 bg-transparent'
        this.$editBtn.style.right = '10px'
        this.$editBtn.addEventListener('click', () => {
            this.openLeadEditModal()
        })

        this.$editIcon = document.createElement('i')
        this.$editIcon.className = 'bi bi-pencil text-primary'
        this.$editIcon.style.fontSize = '13px'

        this.$leadEditModal = new LeadEditModal({ closeLeadEditModal: this.closeLeadEditModal, data: this.data })
    }
    openLeadEditModal = () => {
        app.appendChild(this.$leadEditModal.render())
    }
    closeLeadEditModal = () => {
        app.removeChild(this.$leadEditModal.render())
    }
    render() {
        this.$tr.appendChild(this.$name)
        this.$name.appendChild(this.$nameText)

        this.$tr.appendChild(this.$phonenumber)
        this.$phonenumber.appendChild(this.$phonenumberText)

        this.$tr.appendChild(this.$linkFb)
        this.$linkFb.appendChild(this.$linkFbText)

        this.$tr.appendChild(this.$service)
        this.$service.appendChild(this.$serviceText)

        this.$tr.appendChild(this.$branch)
        this.$branch.appendChild(this.$branchText)

        this.$tr.appendChild(this.$script)
        this.$script.appendChild(this.$scriptText)

        this.$tr.appendChild(this.$interactive)
        this.$interactive.appendChild(this.$interactiveText)

        this.$tr.appendChild(this.$note)
        this.$note.appendChild(this.$noteText)

        this.$tr.appendChild(this.$editBtn)
        this.$editBtn.appendChild(this.$editIcon)

        return this.$tr
    }
}
export default LeadItem