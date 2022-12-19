import { getPage } from "../util/getPage.js";

class Header {
    constructor({ name }) {
        this.$nav = document.createElement("nav");
        this.$nav.className = `navbar bg-box`;
        this.$nav.style = `background-color: #3c4b64;`;

        this.$container = document.createElement("div");
        this.$container.className = `container-lg`;

        this.$avatarBox = document.createElement("a");
        this.$avatarBox.className = `d-flex align-items-center text-cus text-decoration-none`;
        this.$avatarBox.href = "#";
        this.$avatarBox.style.color = "rgba(255, 255, 255, 0.6)";

        this.$avatar = document.createElement("img");
        this.$avatar.className = `rounded-circle me-2`;
        this.$avatar.src = `assets/images/profile.png`;
        this.$avatar.width = "32";
        this.$avatar.height = "32";

        this.$name = document.createElement("strong");
        this.$name.innerHTML = name;

        this.$logout = document.createElement("div");
        this.$logout.className = `text-cus text-decoration-none d-flex align-items-center gap-2`;
        this.$logout.style.cursor = 'pointer'
        this.$logout.innerHTML = "Đăng xuất";
        this.$logout.style.color = "rgba(255, 255, 255, 0.6)";
        this.$logout.addEventListener('click', () => {
            this.clickLogout()
        })

        this.$icon = document.createElement("i");
        this.$icon.className = `bi bi-box-arrow-right`;
    }
    clickLogout = () => {
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        getPage({ name: '' })
    }
    render() {
        this.$nav.appendChild(this.$container);
        this.$container.appendChild(this.$avatarBox);
        this.$avatarBox.appendChild(this.$avatar);
        this.$avatarBox.appendChild(this.$name);
        this.$logout.appendChild(this.$icon);
        this.$container.appendChild(this.$logout);
        return this.$nav;
    }
}
export default Header;