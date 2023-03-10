const url = "https://scigroup.com.vn/cp/seeding/api";
export const login = async(info) => {
    try {
        const response = await fetch(
            `${url}/get-token?login=${info.login}&password=${info.password}`
        );
        const data = await response.json();
        console.log("data: ", data);
        return { type: data.type, message: data.message, token: data.access_token, active: data.active };
    } catch (e) {
        console.log(e);
    }
};
export const getUser = async(token) => {
    try {
        const response = await fetch(`${url}/get-name?token=${token}`);
        const data = await response.json();

        if (!data) {
            console.log("data not found");
            return;
        }
        localStorage.setItem(
            "token",
            `${token}/${data.data.username}/${data.data.rule}`
        );
        return data.data;
    } catch (e) {
        console.log(e);

    }
};
export const updatePassword = async(info) => {
    try {
        const response = await fetch(`${url}/update-password?token=${info.token}&password=${info.password}`);
        const data = await response.json();
        return { type: data.result.message.type, message: data.result.message.content }
    } catch (e) {
        console.log(e);
    }
};