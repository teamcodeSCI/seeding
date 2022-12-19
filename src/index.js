import { getPage } from "./util/getPage.js";

if (localStorage.getItem('role')) {
    getPage({ name: localStorage.getItem('name') });
} else {
    getPage({});
}