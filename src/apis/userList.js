import { removeAccents } from "../util/util.js"

const searchByCode = (data, input) => {
    if (input === '') return data
    return data.filter(item => removeAccents(item.userCode).search(removeAccents(input)) !== -1)
}
export const getUser = async({ limit, pageNum, userCode }) => {
    try {
        const response = await fetch('src/apis/user.json ')
        const data = await response.json()
        const renderData = searchByCode(data, userCode)
        return { message: 'Success', data: renderData }

    } catch (e) {
        console.log(e);
        return
    }
}