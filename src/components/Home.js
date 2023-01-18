import Header from "./Header.js";
import Menu from "./Menu.js";
import Lead from "./lead/Lead.js";
import { getComponent } from "../util/getComponent.js";
import { menu } from "../util/const.js";

class Home {
  tagTitle = "";
  searchName = "";
  searchPhone = "";
  searchService = "";
  searchFb = "";
  searchBranch = "";
  startDate = "";
  endDate = "";
  index = 1;

  constructor() {
    this.$bg = document.createElement("div");
    this.$bg.className = `min-vh-100`;
    this.$bg.style.background = "#efefef";

    this.$header = new Header();

    this.$container = document.createElement("div");
    this.$container.className = `container-lg py-4`;

    this.$nav = document.createElement("div");
    this.$nav.className = "menu";

    this.$content = document.createElement("div");
    this.$content.className = "content";

    this.$menu = new Menu({ getLayout: this.getLayout });
    this.$lead = new Lead();
  }
  getLayout = () => {
    if (!sessionStorage.getItem("link")) {
      sessionStorage.setItem("link", "lead");
    }
    this.$nav.appendChild(this.$menu.render());
    getComponent(this.$content, menu, "link");
  };

  render() {
    this.$bg.appendChild(this.$header.render());
    this.$bg.appendChild(this.$container);
    this.$container.appendChild(this.$nav);
    this.$container.appendChild(this.$content);

    this.getLayout();

    return this.$bg;
  }
}
export default Home;
