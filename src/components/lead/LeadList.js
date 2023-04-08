import { role } from "../../util/const.js";
import LeadItem from "./LeadItem.js";

class LeadList {
  constructor({ data, getAllLead }) {
    this.getAllLead = getAllLead;
    this.data = data;
    this.$container = document.createElement("div");
    this.$container.className = `table-responsive dataTable`;
    this.$container.style.fontSize = "15px";

    this.$theadTr = document.createElement("div");
    this.$theadTr.className =
      "row bg-light bg-gradient p-2 mx-0 flex-nowrap border-bottom";

    this.$name = document.createElement("div");
    this.$name.className = "col text-truncate";
    this.$nameText = document.createElement("p");
    this.$nameText.className = "m-0 fw-bold";
    this.$nameText.innerHTML = `Họ và tên`;

    this.$phonenumber = document.createElement("div");
    this.$phonenumber.className = "col text-truncate";
    this.$phonenumberText = document.createElement("p");
    this.$phonenumberText.className = "m-0 fw-bold";
    this.$phonenumberText.innerHTML = `Điện thoại`;

    this.$linkFb = document.createElement("div");
    this.$linkFb.className = "col text-truncate";
    this.$linkFbText = document.createElement("p");
    this.$linkFbText.className = "m-0 fw-bold";
    this.$linkFbText.innerHTML = `Link Facebook`;

    this.$service = document.createElement("div");
    this.$service.className = "col text-truncate";
    this.$serviceText = document.createElement("p");
    this.$serviceText.className = "m-0 fw-bold";
    this.$serviceText.innerHTML = `Dịch vụ đăng ký`;

    this.$branch = document.createElement("div");
    this.$branch.className = "col text-truncate";
    this.$branchText = document.createElement("p");
    this.$branchText.className = "m-0 fw-bold";
    this.$branchText.innerHTML = `Chi nhánh`;

    this.$script = document.createElement("div");
    this.$script.className = "col text-truncate";
    this.$scriptText = document.createElement("p");
    this.$scriptText.className = "m-0 fw-bold";
    this.$scriptText.innerHTML = `Kịch bản`;

    this.$interactive = document.createElement("div");
    this.$interactive.className = "col text-truncate";
    this.$interactiveText = document.createElement("p");
    this.$interactiveText.className = "m-0 fw-bold";
    this.$interactiveText.innerHTML = `Tương tác`;

    this.$user = document.createElement("div");
    this.$user.className = "col text-truncate";
    this.$userText = document.createElement("p");
    this.$userText.className = "m-0 fw-bold";
    this.$userText.innerHTML = `Nhân viên`;

    this.$note = document.createElement("div");
    this.$note.className = "col text-truncate";
    this.$noteText = document.createElement("p");
    this.$noteText.className = "m-0 fw-bold";
    this.$noteText.innerHTML = `Ghi chú`;

    this.$tbody = document.createElement("div");
    this.$tbody.className = "bg-item";

    this.getAllLeads();
  }
  getAllLeads = () => {
    this.$tbody.innerHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      this.$item = new LeadItem({
        ...this.data[i],
        getAllLead: this.getAllLead
      });
      this.$tbody.appendChild(this.$item.render());
    }
    return this.$tbody;
  };

  render() {
    this.$container.appendChild(this.$theadTr);
    this.$container.appendChild(this.$tbody);

    this.$theadTr.appendChild(this.$name);
    this.$name.appendChild(this.$nameText);

    this.$theadTr.appendChild(this.$phonenumber);
    this.$phonenumber.appendChild(this.$phonenumberText);

    this.$theadTr.appendChild(this.$linkFb);
    this.$linkFb.appendChild(this.$linkFbText);

    this.$theadTr.appendChild(this.$service);
    this.$service.appendChild(this.$serviceText);

    this.$theadTr.appendChild(this.$branch);
    this.$branch.appendChild(this.$branchText);

    this.$theadTr.appendChild(this.$script);
    this.$script.appendChild(this.$scriptText);

    this.$theadTr.appendChild(this.$interactive);
    this.$interactive.appendChild(this.$interactiveText);

    if (role === "admin") {
      this.$theadTr.appendChild(this.$user);
      this.$user.appendChild(this.$userText);
    }

    this.$theadTr.appendChild(this.$note);
    this.$note.appendChild(this.$noteText);

    return this.$container;
  }
}
export default LeadList;
