import { getUser } from "../../apis/userList.js";
import { convertNumber } from "../../util/util.js";

class HeaderItem {
  constructor({ name }) {
    this.name = name;
    this.$headerItem = document.createElement("th");
    this.$headerItem.style.width = "calc(100% / 12)";
    this.$headerItem.innerHTML = name;
  }
  getName = async () => {
    const user = await getUser({ userCode: this.name });
    this.$headerItem.innerHTML = this.name === "" ? "" : user.data[1].name;
  };
  render() {
    this.getName();
    return this.$headerItem;
  }
}
class Row {
  constructor({ data }) {
    this.data = data;
    this.$tr = document.createElement("tr");
  }
  renderItem = () => {
    this.$tr.innerHTML = "";
    this.data.forEach((item) => {
      this.$col = new Col({
        data: typeof item === "object" ? item.target : item
      });
      this.$tr.appendChild(this.$col.render());
    });
  };
  render() {
    this.renderItem();
    return this.$tr;
  }
}
class Col {
  constructor({ data }) {
    this.data = data;
    this.$td = document.createElement("td");
    this.$td.innerHTML =
      typeof data === "string"
        ? `Tháng ${new Date(data).getMonth() + 1}`
        : convertNumber(data);
  }

  render() {
    return this.$td;
  }
}
class TargetList {
  constructor({ data }) {
    this.data = data;
    this.$table = document.createElement("table");
    this.$table.className = "targetTable w-100";
    this.$table.style.fontSize = "14px";
    this.$header = document.createElement("tr");
    this.$body = document.createElement("tbody");
  }
  renderHeader = () => {
    this.$header.innerHTML = "";
    this.newData = [""];
    for (let i = 0; i < this.data.user.length; i++) {
      this.$headerItem = new HeaderItem({ name: this.data.user[i] });
      this.$header.appendChild(this.$headerItem.render());
    }
  };
  renderRow = () => {
    this.$body.innerHTML = "";
    this.data.data.forEach((item) => {
      this.$row = new Row({
        data: item
      });
      this.$body.appendChild(this.$row.render());
    });
  };
  render() {
    this.renderHeader();
    this.renderRow();
    this.$table.appendChild(this.$header);
    this.$table.appendChild(this.$body);
    return this.$table;
  }
}
export default TargetList;
