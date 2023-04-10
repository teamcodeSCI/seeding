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

    this.$user = document.createElement("div");
    this.$user.className = "col text-truncate";
    this.$userText = document.createElement("p");
    this.$userText.className = "m-0 fw-bold";
    this.$userText.innerHTML = `Nhân viên`;

    this.$date = document.createElement("div");
    this.$date.className = "col text-truncate";
    this.$dateText = document.createElement("p");
    this.$dateText.className = "m-0 fw-bold";
    this.$dateText.innerHTML = `Ngày tạo`;

    this.$viewmore = document.createElement("div");
    this.$viewmore.className = "col text-truncate";
    this.$viewmoreText = document.createElement("p");
    this.$viewmoreText.className = "m-0 fw-bold";
    this.$viewmoreText.innerHTML = "Xem thêm";

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

    this.$theadTr.appendChild(this.$service);
    this.$service.appendChild(this.$serviceText);

    this.$theadTr.appendChild(this.$branch);
    this.$branch.appendChild(this.$branchText);

    if (role === "admin") {
      this.$theadTr.appendChild(this.$user);
      this.$user.appendChild(this.$userText);
    }

    this.$theadTr.appendChild(this.$date);
    this.$date.appendChild(this.$dateText);

    this.$theadTr.appendChild(this.$viewmore);
    this.$viewmore.appendChild(this.$viewmoreText);
    return this.$container;
  }
}
export default LeadList;
