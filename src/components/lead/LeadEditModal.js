import { getBranch } from "../../apis/getInfo.js";
import { updateLead } from "../../apis/lead.js";
import { splitStr } from "../../util/splitStr.js";
import InputGroup from "../InputGroup.js";
import SuggestItem from "../SuggestItem.js";
import Textarea from "../Textarea.js";

class LeadEditModal {
    constructor({ data, closeLeadEditModal, getAllLead }) {
        this.getAllLead = getAllLead
        this.data = data;
        this.closeLeadEditModal = closeLeadEditModal;
        this.$container = document.createElement("div");
        this.$container.className = `modal d-flex align-items-center justify-content-center`;
        this.$container.style.background = "rgba(0,0,0,0.7)";

        this.$dialog = document.createElement("div");
        this.$dialog.className = `modal-dialog`;
        this.$dialog.style.maxWidth = "650px";
        this.$dialog.style.width = "90%";

        this.$notify = document.createElement('p')
        this.$notify.className = 'm-0 text-center fst-italic text-danger mt-2'
        this.$notify.style.fontSize = '14px'

        this.$content = document.createElement("div");
        this.$content.className = `modal-content`;

        this.$header = document.createElement("div");
        this.$header.className = `modal-header`;

        this.$title = document.createElement("h5");
        this.$title.className = `modal-title`;
        this.$title.innerHTML = `Sửa thông tin`;

        this.$closeBtn = document.createElement("button");
        this.$closeBtn.className = `btn-close`;
        this.$closeBtn.addEventListener("click", () => {
            this.closeLeadEditModal();
        });

        this.$body = document.createElement("div");
        this.$body.className = `modal-body p-4`;

        this.$border = document.createElement("div");
        this.$border.className = `bg-white d-flex justify-content-between gap-3 flex-column`;

        this.$footer = document.createElement("div");
        this.$footer.className = `modal-footer`;

        this.$saveBtn = document.createElement("button");
        this.$saveBtn.className = "btn btn-primary";
        this.$saveBtn.innerHTML = "Lưu thay đổi";
        this.$saveBtn.addEventListener("click", () => {
            this.clickSave();
        });
        this.$name = new InputGroup({
            placeholder: "Họ và tên",

            value: this.data.name
        });
        this.$phone = new InputGroup({
            placeholder: "Điện thoại",

            value: this.data.phone
        });
        this.$nameFb = new InputGroup({
            placeholder: "Tên FB",

            value: this.data.name_fb
        });
        this.$linkFb = new InputGroup({
            placeholder: "Link FB",

            value: this.data.link_fb
        });
        this.$service = new InputGroup({
            placeholder: "Dịch vụ đăng ký",

            value: this.data.service
        });
        this.$branchBox = document.createElement("div");
        this.$branchBox.className = "branchBox position-relative";
        this.$branchBox.addEventListener("click", () => {
            this.handleSuggest();
        });
        this.$branch = new InputGroup({
            placeholder: "Chi nhánh",
            width: "100%",
            value: this.data.company_name,
            hideValue: this.data.company_code,
            isSuggested: true,
            getSuggest: this.getSuggest,
            openSuggest: this.openSuggest,
            closeSuggest: this.closeSuggest
        });
        this.$script = new InputGroup({
            placeholder: "Kịch bản",

            value: this.data.script
        });
        this.$interactive = new InputGroup({
            placeholder: "Tương tác",

            value: this.data.interactive_proof
        });
        this.$note = new Textarea({
            palaceHolder: "Ghi chú",
            value: this.data.note
        });

        this.$suggestBox = document.createElement("div");
        this.$suggestBox.className =
            "position-absolute w-100 top-100 start-0 rounded-1";
        this.$suggestBox.style.maxHeight = "300px";
        this.$suggestBox.style.overflow = "overlay";
        this.$suggestBox.style.background = "#fff";
        this.$suggestBox.style.zIndex = 1;
        this.$suggestBox.style.boxShadow = "1px 1px 3px 0px rgba(0,0,0,0.2)";
        this.getSuggest(this.$branch.getValue().value);
    }
    clickSave = async() => {

        if (
            this.$name.getValue().value === "" ||
            this.$phone.getValue().value === "" ||
            this.$nameFb.getValue().value === "" ||
            this.$linkFb.getValue().value === "" ||
            this.$service.getValue().value === "" ||
            this.$branch.getValue().hideValue === ""
        ) {
            this.$name.fail();
            this.$phone.fail();
            this.$nameFb.fail();
            this.$linkFb.fail();
            this.$service.fail();
            this.$branch.fail();
            return;
        }
        const update = await updateLead({
            codeForm: this.data.codeForm,
            userId: this.data.seedingUserId,
            name: this.$name.getValue().value,
            phone: this.$phone.getValue().value,
            nameFb: this.$nameFb.getValue().value,
            linkFb: this.$linkFb.getValue().value,
            service: this.$service.getValue().value,
            branch: this.$branch.getValue().hideValue,
            script: this.$script.getValue().value,
            note: this.$note.getValue(),
            interactive: this.$interactive.getValue().value
        })
        if (update.type !== 0) {
            this.$notify.innerHTML = update.message
            return
        }
        this.closeLeadEditModal();
        this.getAllLead()
    };
    handleSuggest = () => {
        if (this.$branchBox !== this.$suggestBox.parentElement) {
            this.openSuggest();
        } else {
            this.closeSuggest();
        }
    };
    openSuggest = () => {
        this.$branchBox.appendChild(this.$suggestBox);
    };
    closeSuggest = () => {
        this.$branchBox.removeChild(this.$suggestBox);
    };
    getSuggest = async(input) => {
        const suggest = await getBranch({
            token: splitStr(localStorage.getItem("token")).token,
            input: input
        });
        if (!suggest) {
            console.log("data not found");
            return;
        }
        this.$suggestBox.innerHTML = "";
        suggest.forEach((item) => {
            this.$suggestItem = new SuggestItem({
                name: item.name,
                code: item.code,
                setBranchVal: this.$branch.setValue
            });
            this.$suggestBox.appendChild(this.$suggestItem.render());
        });
    };
    render() {
        this.$container.appendChild(this.$dialog);
        this.$dialog.appendChild(this.$content);
        this.$content.appendChild(this.$header);
        this.$header.appendChild(this.$title);
        this.$header.appendChild(this.$closeBtn);
        this.$content.appendChild(this.$body);
        this.$body.appendChild(this.$border);
        this.$body.appendChild(this.$notify);

        this.$border.appendChild(this.$name.render());
        this.$border.appendChild(this.$phone.render());
        this.$border.appendChild(this.$nameFb.render());
        this.$border.appendChild(this.$linkFb.render());
        this.$border.appendChild(this.$service.render());
        this.$border.appendChild(this.$branchBox);
        this.$branchBox.appendChild(this.$branch.render());
        this.$border.appendChild(this.$script.render());
        this.$border.appendChild(this.$interactive.render());
        this.$border.appendChild(this.$note.render());

        this.$content.appendChild(this.$footer);
        this.$footer.appendChild(this.$saveBtn);
        return this.$container;
    }
}
export default LeadEditModal;