import { getDuplicate, removeAccents } from "../util/util.js"

export const getNumberBrand = async() => {
    try {
        const response = await fetch('src/apis/reportNumber.json')
        const data = await response.json()
        return {
            message: 'Success',
            data: data
        }
    } catch (error) {
        return { message: error }
    }
}
const searchByService = (data, input) => {
    if (input === '') return data
    return data.filter(item => removeAccents(item.service).search(removeAccents(input)) !== -1)
}
const searchByBrand = (data, input) => {
    if (input === 'Tất cả' || input === 'Thương hiệu') return data
    return data.filter(item => removeAccents(item.brand).search(removeAccents(input)) !== -1)
}

export const getCustomerSuccess = async({ search, filter }) => {
    try {
        const response = await fetch('src/apis/customerSuccess.json')
        const data = await response.json()
        const searchData = searchByService(data, search)
        const filterData = searchByBrand(data, filter)
        const renderData = getDuplicate(searchData, filterData)

        return {
            message: 'Success',
            data: renderData.sort((a, b) => b.number - a.number)
        }
    } catch (error) {
        return { message: error }
    }
}