const url = 'https://scigroup.com.vn/cp/seeding/api'
export const login = async(info) => {
    try {
        const response = await fetch(`${url}/get-token?login=${info.login}&password=${info.password}`);
        const data = await response.json();
        return data.access_token
    } catch (e) {
        console.log(e);
    }
}