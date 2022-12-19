import Login from "../components/Login.js";
import Home from "../components/Home.js";
import { app } from "./const.js";

const login = new Login();
let currentPage = null;

export const setPage = (component) => {
    if (currentPage) {
        app.removeChild(currentPage);
    }
    currentPage = app.appendChild(component.render());
};
export const getPage = ({ name }) => {
    if (localStorage.getItem("role") === 'MEMBER') {
        const home = new Home({ name: name });
        setPage(home);
        return;
    }
    setPage(login);
    return;
};