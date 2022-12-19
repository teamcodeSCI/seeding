const URL = "src/apis/user.json";

const getAllUser = async() => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        return;
    }
};

const getUserByUsername = async(username) => {
    try {
        const allUser = await getAllUser();
        const user = allUser.filter((e) => {
            return e.username === username;
        });
        return user[0];
    } catch (e) {
        console.log(e);
        return;
    }
};

const login = async(username, password) => {
    try {
        const user = await getUserByUsername(username);

        if (!user) {
            console.log("user not found");
            return;
        }
        if (username !== user.username || password !== user.password) {
            console.log("wrong phone number or passsword");
            return;
        }
        return {
            name: user.name,
            username: user.username,
            password: user.password,
            role: user.role,
            isLogin: true,
        };
    } catch (e) {
        console.log(e);
        return;
    }
};
export { login };