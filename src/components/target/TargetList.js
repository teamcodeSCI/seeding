import { getUser } from "../../apis/userList.js";
import { convertNumber } from "../../util/util.js";

class HeaderItem {
  constructor({ month }) {
    this.$headerItem = document.createElement("th");
    this.$headerItem.style.width = "calc(100% / 12)";
    this.$headerItem.innerHTML = month;
  }
  render() {
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
      this.$col = new Col({ data: item });
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
    this.$td.innerHTML = convertNumber(data);
  }
  getName = async () => {
    if (typeof this.data === "string") {
      const user = await getUser({ userCode: this.data });
      this.$td.innerHTML = user.data[1].name;
    }
  };
  render() {
    this.getName();
    return this.$td;
  }
}
class TargetList {
  constructor({ data }) {
    this.data = data;
    this.$table = document.createElement("table");
    this.$table.className = "targetTable w-100";
    this.$header = document.createElement("tr");
    this.$body = document.createElement("tbody");
  }
  renderHeader = () => {
    this.$header.innerHTML = "";
    for (let i = 0; i <= 12; i++) {
      this.$headerItem = new HeaderItem({ month: i === 0 ? "" : `T${i}` });
      this.$header.appendChild(this.$headerItem.render());
    }
  };
  renderRow = () => {
    this.$body.innerHTML = "";
    this.data.forEach((item) => {
      this.$row = new Row({ data: item });
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
