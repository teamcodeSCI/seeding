import LeadDetailItem from "./LeadDetailItem.js";

class LeadDetailModal {
  constructor({ closeLeadDetail, data }) {
    this.data = data;
    this.$container = document.createElement("div");
    this.$container.className = `modal d-flex align-items-center justify-content-center`;
    this.$container.style.background = "rgba(0,0,0,0.7)";

    this.$dialog = document.createElement("div");
    this.$dialog.className = `modal-dialog`;
    this.$dialog.style.maxWidth = "700px";

    this.$dialog.style.width = "90%";

    this.$content = document.createElement("div");
    this.$content.className = `modal-content`;

    this.$header = document.createElement("div");
    this.$header.className = `modal-header px-3 py-2`;

    this.$title = document.createElement("h5");
    this.$title.className = `modal-title`;
    this.$title.innerHTML = `Chi tiết`;

    this.$closeBtn = document.createElement("button");
    this.$closeBtn.className = `btn-close`;
    this.$closeBtn.addEventListener("click", () => {
      closeLeadDetail();
    });

    this.$body = document.createElement("div");
    this.$body.className = `modal-body d-flex flex-column`;
    this.$body.style.gap = "0.3rem";
    this.$body.style.maxHeight = "500px";
    this.$body.style.overflow = "auto";

    this.$footer = document.createElement("div");
    this.$footer.className = `modal-footer`;

    this.$doneBtn = document.createElement("button");
    this.$doneBtn.className = "btn btn-primary";
    this.$doneBtn.innerHTML = "Xong";
    this.$doneBtn.addEventListener("click", () => {
      closeLeadDetail();
    });
    this.$codeForm = new LeadDetailItem({
      title: "Mã",
      value: data.codeForm
    });
    this.$name = new LeadDetailItem({
      title: "Họ và tên",
      value: data.name
    });
    this.$phone = new LeadDetailItem({
      title: "Số điện thoại",
      value: data.phone
    });
    this.$fb = new LeadDetailItem({
      title: "Facebook",
      value: data.name_fb,
      link: data.link_fb
    });
    this.$service = new LeadDetailItem({
      title: "Dịch vụ đăng ký",
      value: data.service
    });
    this.$branch = new LeadDetailItem({
      title: "Chi nhánh",
      value: data.company_name
    });
    this.$script = new LeadDetailItem({
      title: "Kịch bản",
      value: data.script
    });
    this.$interactive = new LeadDetailItem({
      title: "Tương tác",
      value: data.interactive_proof
    });
    this.$date = new LeadDetailItem({
      title: "Thời gian",
      value: data.date
    });
    this.$note = new LeadDetailItem({
      title: "Ghi chú",
      value: data.note
    });
  }
  render() {
    this.$container.appendChild(this.$dialog);
    this.$dialog.appendChild(this.$content);

    this.$content.appendChild(this.$header);
    this.$content.appendChild(this.$body);

    this.$header.appendChild(this.$title);
    this.$header.appendChild(this.$closeBtn);

    this.$body.appendChild(this.$codeForm.render());
    this.$body.appendChild(this.$name.render());
    this.$body.appendChild(this.$phone.render());
    this.$body.appendChild(this.$fb.render());
    this.$body.appendChild(this.$service.render());
    this.$body.appendChild(this.$branch.render());
    this.$body.appendChild(this.$script.render());
    this.$body.appendChild(this.$interactive.render());
    this.$body.appendChild(this.$date.render());
    this.$body.appendChild(this.$note.render());

    this.$content.appendChild(this.$footer);
    this.$footer.appendChild(this.$doneBtn);
    return this.$container;
  }
}
export default LeadDetailModal;
