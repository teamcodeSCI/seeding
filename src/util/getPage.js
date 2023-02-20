import Login from "../components/Login.js";
import Home from "../components/Home.js";
import { app } from "./const.js";
import { splitStr } from "./splitStr.js";

const login = new Login();
let currentPage = null;

export const setPage = (component) => {
    if (currentPage) {
        app.removeChild(currentPage);
    }
    currentPage = app.appendChild(component.render());
};
export const getPage = () => {
    if (!localStorage.getItem("token")) {
        setPage(login);
        return;
    }
    const home = new Home();
    setPage(home);
    return;
};