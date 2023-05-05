import RevenueTableItem from "./RevenueTableItem.js";

class RevenueTable {
  constructor({ data }) {
    this.data = data;
    this.$table = document.createElement("table");
    this.$table.className = "table w-100";
    this.$table.style.fontSize = "14px";

    this.$thead = document.createElement("thead");
    this.$headerTr = document.createElement("tr");

    this.$stt = document.createElement("th");
    this.$stt.innerHTML = "STT";

    this.$service = document.createElement("th");
    this.$service.innerHTML = "Dịch vụ";

    this.$brand = document.createElement("th");
    this.$brand.innerHTML = "Thương hiệu";

    this.$revenue = document.createElement("th");
    this.$revenue.innerHTML = "Doanh thu";

    this.$tbody = document.createElement("tbody");
  }
  renderItem = () => {
    this.$tbody.innerHTML = "";
    this.data.forEach((item, idx) => {
      this.$item = new RevenueTableItem({
        stt: idx + 1,
        service: item.service,
        brand: item.brand,
        revenue: item.revenue
      });
      this.$tbody.appendChild(this.$item.render());
    });
  };
  render() {
    this.$table.appendChild(this.$thead);
    this.$table.appendChild(this.$tbody);
    this.$thead.appendChild(this.$headerTr);
    this.$headerTr.appendChild(this.$stt);
    this.$headerTr.appendChild(this.$service);
    this.$headerTr.appendChild(this.$brand);
    this.$headerTr.appendChild(this.$revenue);
    this.renderItem();
    return this.$table;
  }
}
export default RevenueTable;
