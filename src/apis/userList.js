import { splitStr } from "../util/splitStr.js"

export const getUser = async({ userCode }) => {
    try {
        const token = splitStr(localStorage.getItem('token')).token
        const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/get-user?token=${token}&code_user=${userCode}`)
        const data = await response.json()
        return {
            message: 'Success',
            data: data.data.sort((a, b) => {
                if (a.active_user !== undefined && b.active_user !== undefined) {
                    return (a === b) ? 0 : a ? -1 : 1;
                }
            })
        }

    } catch (e) {
        console.log(e);
        return
    }
}
export const createUser = async({ name, phone, mobile, birth }) => {
    const token = splitStr(localStorage.getItem('token')).token
    const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/create-user?token=${token}&name=${name}&phone=${phone}&mobile=${mobile}&date_of_birth=${birth}`);
    const data = await response.json();
    return data
}
export const updatePassUser = async({ user, password }) => {
    const token = splitStr(localStorage.getItem('token')).token
    const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/update-password-member?token=${token}&login=${user}&password=${password}`);
    const data = await response.json();
    return data
}
export const activeUser = async({ codeUser, active }) => {
    const token = splitStr(localStorage.getItem('token')).token
    const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/update-active-user?token=${token}&code_user=${codeUser}&active=${active}`);
    const data = await response.json();
    return data
}