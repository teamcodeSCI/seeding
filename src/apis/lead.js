import { splitStr } from "../util/splitStr.js";



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
        console.log("data: ", data);
        const count = data.data[0].count_no_limit - 1;
        const renderData = []
        for (let i = 1; i < data.data.length; i++) {
            renderData.push(data.data[i])
        }
        const pageCount = Math.ceil(count / paginationLimit);

        return {
            message: data.message,
            render: renderData,
            pageCount: pageCount
        };
    } catch (e) {
        console.log(e);
        return;
    }
};