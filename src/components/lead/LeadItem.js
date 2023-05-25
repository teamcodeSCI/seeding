import { app, role } from "../../util/const.js";
import { formatDateTime } from "../../util/util.js";
import DeleteModal from "./DeleteModal.js";
import LeadDetailModal from "./LeadDetailModal.js";
import LeadEditModal from "./LeadEditModal.js";

class LeadItem {
  constructor({
    name,
    phone,
    name_fb,
    link_fb,
    service,
    company_name,
    company_code,
    script,
    interactive_proof,
    note,
    code_form,
    seeding_user_name,
    getAllLead,
    user,
    create_date
  }) {
    this.data = {
      seedingUserName: seeding_user_name,
      codeForm: code_form,
      name: name,
      phone: phone,
      name_fb: name_fb,
      link_fb: link_fb,
      service: service,
      company_name: company_name,
      company_code: company_code,
      script: script,
      interactive_proof: interactive_proof,
      note: note,
      user: user,
      date: create_date
    };
    this.getAllLead = getAllLead;
    this.$tr = document.createElement("div");
    this.$tr.className = "row mx-0 p-2 position-relative";

    this.$name = document.createElement("div");
    this.$name.className = "col text-truncate";
    this.$nameText = document.createElement("p");
    this.$nameText.className = "m-0";
    this.$nameText.innerHTML = name;

    this.$phonenumber = document.createElement("div");
    this.$phonenumber.className = "col text-truncate";
    this.$phonenumberText = document.createElement("p");
    this.$phonenumberText.className = "m-0";
    this.$phonenumberText.innerHTML = phone;

    this.$service = document.createElement("div");
    this.$service.className = "col text-truncate";
    this.$serviceText = document.createElement("p");
    this.$serviceText.className = "m-0";
    this.$serviceText.innerHTML = service;

    this.$branch = document.createElement("div");
    this.$branch.className = "col text-truncate";
    this.$branchText = document.createElement("p");
    this.$branchText.className = "m-0";
    this.$branchText.innerHTML = company_name;

    this.$user = document.createElement("div");
    this.$user.className = "col text-truncate";
    this.$userText = document.createElement("p");
    this.$userText.className = "m-0";
    this.$userText.innerHTML = seeding_user_name;

    this.$date = document.createElement("div");
    this.$date.className = "col text-truncate";
    this.$dateText = document.createElement("p");
    this.$dateText.className = "m-0";
    this.$dateText.innerHTML = formatDateTime(create_date, true);

    this.$viewmore = document.createElement("div");
    this.$viewmore.className = "col text-truncate";
    this.$viewmoreText = document.createElement("button");
    this.$viewmoreText.className = "p-0 btn btn-link";
    this.$viewmoreText.innerHTML = "Xem thêm";
    this.$viewmore.addEventListener("click", () => {
      this.openLeadDetail();
    });

    this.$editBtn = document.createElement("button");
    this.$editBtn.className =
      "position-absolute w-auto border-0 p-0 bg-transparent";
    this.$editBtn.style.right = "10px";
    this.$editBtn.addEventListener("click", () => {
      this.openLeadEditModal();
    });

    this.$editIcon = document.createElement("i");
    this.$editIcon.className = "bi bi-pencil text-primary";
    this.$editIcon.style.fontSize = "14px";

    this.$delBtn = document.createElement("button");
    this.$delBtn.className =
      "position-absolute w-auto border-0 p-0 bg-transparent";
    this.$delBtn.style.right = "35px";
    this.$delBtn.addEventListener("click", () => {
      this.openDelModal();
    });

    this.$delIcon = document.createElement("i");
    this.$delIcon.className = "bi bi-trash text-danger";
    this.$delIcon.style.fontSize = "15px";

    this.$leadEditModal = new LeadEditModal({
      closeLeadEditModal: this.closeLeadEditModal,
      data: this.data,
      getAllLead: this.getAllLead
    });
    this.$leadDetail = new LeadDetailModal({
      closeLeadDetail: this.closeLeadDetail,
      data: this.data
    });
    this.$delModal = new DeleteModal({
      closeDelModal: this.closeDelModal,
      codeForm: code_form,
      getAllLead: this.getAllLead
    });
  }
  openLeadDetail = () => {
    app.appendChild(this.$leadDetail.render());
  };
  closeLeadDetail = () => {
    app.removeChild(this.$leadDetail.render());
  };
  openLeadEditModal = () => {
    app.appendChild(this.$leadEditModal.render());
  };
  closeLeadEditModal = () => {
    app.removeChild(this.$leadEditModal.render());
  };
  openDelModal = () => {
    app.appendChild(this.$delModal.render());
  };
  closeDelModal = () => {
    app.removeChild(this.$delModal.render());
  };
  render() {
    this.$tr.appendChild(this.$name);
    this.$name.appendChild(this.$nameText);

    this.$tr.appendChild(this.$phonenumber);
    this.$phonenumber.appendChild(this.$phonenumberText);

    this.$tr.appendChild(this.$service);
    this.$service.appendChild(this.$serviceText);

    this.$tr.appendChild(this.$branch);
    this.$branch.appendChild(this.$branchText);

    if (role === "admin") {
      this.$tr.appendChild(this.$user);
      this.$user.appendChild(this.$userText);
    }
    this.$tr.appendChild(this.$date);
    this.$date.appendChild(this.$dateText);

    this.$tr.appendChild(this.$viewmore);
    this.$viewmore.appendChild(this.$viewmoreText);

    this.$tr.appendChild(this.$editBtn);
    this.$editBtn.appendChild(this.$editIcon);
    if (role === "admin") {
      this.$tr.appendChild(this.$delBtn);
      this.$delBtn.appendChild(this.$delIcon);
    }
    return this.$tr;
  }
}
export default LeadItem;
