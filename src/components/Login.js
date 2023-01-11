import { login } from "../apis/login.js";
import { getPage } from "../util/getPage.js";
import Input from "./Input.js";

class Login {
    constructor() {
        this.$bg = document.createElement("div");
        this.$bg.className = `vh-100`;
        this.$bg.style = `background-color: #508bfc;`;

        this.$container = document.createElement("div");
        this.$container.className = `container py-5 h-100`;

        this.$row = document.createElement("div");
        this.$row.className = `row d-flex justify-content-center align-items-center h-100`;

        this.$col = document.createElement("div");
        this.$col.className = `col-12 col-md-8 col-lg-6 col-xl-5`;

        this.$card = document.createElement("div");
        this.$card.className = `card shadow-2-strong`;
        this.$card.style = `border-radius: 2rem;`;

        this.$cardBody = document.createElement("div");
        this.$cardBody.className = `card-body p-5`;

        this.$signIn = document.createElement("h3");
        this.$signIn.className = `mb-5 text-center`;
        this.$signIn.innerHTML = "Đăng nhập";

        this.$phonenumber = new Input({ type: "text", placeholder: "Số điện thoại" });
        this.$phonenumber.render().addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                this.clickLogin()
            }
        })
        this.$pass = new Input({ type: "password", placeholder: "Mật khẩu" });
        this.$pass.render().addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                this.clickLogin()
            }
        })
        this.$boxButton = document.createElement("div");
        this.$boxButton.className = `text-center`;

        this.$button = document.createElement("button");
        this.$button.className = `btn btn-primary btn-lg btn-block w-50 text-center`;
        this.$button.type = `submit`;
        this.$button.style = `border-radius: 2rem;`;
        this.$button.innerHTML = "Đăng nhập";
        this.$button.addEventListener("click", () => {
            this.clickLogin();
        });
    }
    clickLogin = async() => {
        try {
            const accessToken = await login({ login: this.$phonenumber.getInputValue(), password: this.$pass.getInputValue() })
            if (!accessToken) {
                this.$phonenumber.fail();
                this.$pass.fail();
                console.log('unauthorized');
                return
            }
            localStorage.setItem('accessToken', accessToken)
            getPage()

        } catch (e) {
            console.log(e);
        }
    }
    render() {
        this.$bg.appendChild(this.$container);
        this.$container.appendChild(this.$row);
        this.$row.appendChild(this.$col);
        this.$col.appendChild(this.$card);
        this.$card.appendChild(this.$cardBody);
        this.$cardBody.appendChild(this.$signIn);
        this.$cardBody.appendChild(this.$phonenumber.render());
        this.$cardBody.appendChild(this.$pass.render());
        this.$cardBody.appendChild(this.$boxButton);
        this.$boxButton.appendChild(this.$button);
        return this.$bg;
    }
}

export default Login;