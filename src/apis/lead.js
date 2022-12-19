import { searchByName, searchByBranch, searchByService, searchByPhone, searchByNameFb } from "../util/search.js";


const URL = 'src/apis/leadList.json'
export const getLead = async({ pageNum, name, phone, service, fb, branch, startDate, endDate }) => {
    try {
        const newData = []
        const convertStart = new Date(startDate)
        const convertEnd = new Date(endDate)

        // Call API
        const response = await fetch(URL);
        const data = await response.json();

        // searchName
        const dataName = searchByName(name, data)
        const renderNameData = name !== '' ? dataName : data

        // searchPhone
        const dataPhone = searchByPhone(phone, data)
        const renderPhoneData = phone !== '' ? dataPhone : data

        // searchService
        const dataService = searchByService(service, data)
        const renderServiceData = service !== '' ? dataService : data

        // searchFb
        const dataFb = searchByNameFb(fb, data)
        const renderFbData = fb !== '' ? dataFb : data

        // searchBranch
        const dataBranch = searchByBranch(branch, data)
        const renderBranchData = branch !== '' ? dataBranch : data

        // searchDate
        const searchDate = data.filter(item => {
            if (startDate !== '' && endDate !== '') {
                return (new Date(item.createAt)) >= convertStart && (new Date(item.createAt)) <= convertEnd
            }
            return item
        })

        // Kết hợp Search
        const namePhone = renderPhoneData.filter((item) => {
            return renderNameData.indexOf(item) !== -1
        })

        const serviceFb = renderServiceData.filter((item) => {
            return renderFbData.indexOf(item) !== -1
        })

        const namePhoneServiceFb = namePhone.filter((item) => {
            return serviceFb.indexOf(item) !== -1
        })

        const namePhoneServiceFbBranch = namePhoneServiceFb.filter((item) => {
            return renderBranchData.indexOf(item) !== -1
        })

        const renderData = namePhoneServiceFbBranch.filter((item) => {
            return searchDate.indexOf(item) !== -1
        })

        // Pagination
        const paginationLimit = 15
        const pageCount = Math.ceil(renderData.length / paginationLimit);

        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        // getData
        renderData.forEach((item, index) => {
            if (index >= prevRange && index < currRange) {
                newData.push(item)
            }
        });
        return {
            render: newData,
            pageCount: pageCount
        }
    } catch (e) {
        console.log(e);
        return
    }
}