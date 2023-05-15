import { app, tabLead, tabSuccess } from "../../util/const.js";
import { getComponent } from "../../util/getComponent.js";

import Tabs from "../Tabs.js";

class ReportLB {
    constructor() {
        this.$container = document.createElement("div");
        this.$container.className = "report px-3 py-4 bg-white";

        this.$titleLB = document.createElement("div");
        this.$titleLB.className = "title fs-5 fw-bold text-uppercase mb-2";
        this.$titleLB.innerHTML = "Số lượng form/booking:";

        this.$navLB = document.createElement("div");
        this.$navLB.className = "menuLB mb-1";

        this.$contentLB = document.createElement("div");
        this.$contentLB.className = "contentLB mb-4";

        this.$titleSuccess = document.createElement("div");
        this.$titleSuccess.className = "title fs-5 fw-bold text-uppercase mb-2";
        this.$titleSuccess.innerHTML = "Số lượng khách hàng thành công:";

        this.$navSuccess = document.createElement("div");
        this.$navSuccess.className = "menuSuccess mb-2";

        this.$contentSuccess = document.createElement("div");
        this.$contentSuccess.className = "contentSuccess";
    }
    getLayoutLB = () => {
        if (!sessionStorage.getItem("tabLB")) {
            sessionStorage.setItem("tabLB", "[LB] day");
        }
        this.$menuLB = new Tabs({
            getLayout: this.getLayoutLB,
            tab: "tabLB",
            tabs: tabLead
        });
        this.$navLB.innerHTML = "";
        this.$navLB.appendChild(this.$menuLB.render());
        getComponent(this.$contentLB, tabLead, "tabLB");
    };
    getLayoutSuccess = () => {
        if (!sessionStorage.getItem("tabSuccess")) {
            sessionStorage.setItem("tabSuccess", "[Success] day");
        }
        this.$menuSuccess = new Tabs({
            getLayout: this.getLayoutSuccess,
            tab: "tabSuccess",
            tabs: tabSuccess
        });
        this.$navSuccess.innerHTML = "";
        this.$navSuccess.appendChild(this.$menuSuccess.render());
        getComponent(this.$contentSuccess, tabSuccess, "tabSuccess");
    };

    render() {
        this.$container.appendChild(this.$titleLB);
        this.$container.appendChild(this.$navLB);
        this.$container.appendChild(this.$contentLB);
        this.$container.appendChild(this.$titleSuccess);
        this.$container.appendChild(this.$navSuccess);
        this.$container.appendChild(this.$contentSuccess);
        this.getLayoutLB();
        this.getLayoutSuccess();
        return this.$container;
    }
}
export default ReportLB;