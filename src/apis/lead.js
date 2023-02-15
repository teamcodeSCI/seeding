import { splitStr } from "../util/splitStr.js";


export const getPageCount = async() => {
    try {
        const token = splitStr(localStorage.getItem('token')).token
        const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/get-form?token=${token}`)
        const data = await response.json();

        return data.count
    } catch (e) {
        console.log(e);
    }
}
export const getLead = async({
    pageNum,
    name,
    phone,
    service,
    fb,
    branch,
    startDate,
    endDate
}) => {
    try {

        const token = splitStr(localStorage.getItem('token')).token
        const paginationLimit = 15;

        // Call API
        const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/get-form?token=${token}&brand_id=${''}&type=seeding&limit=${paginationLimit}&offset=${pageNum}&company_id=${branch}&name_fb=${fb}&phone=${phone}&service=${service}&name=${name}&start_date=${startDate}&end_date=${endDate}`);
        const data = await response.json();
        const count = await getPageCount()
        console.log("count: ", count);

        const pageCount = Math.ceil(count / paginationLimit);

        // Pagination
        return {
            render: data.data,
            pageCount: pageCount
        };
    } catch (e) {
        console.log(e);
        return;
    }
};