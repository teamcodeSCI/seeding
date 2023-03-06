import { splitStr } from "../util/splitStr.js";


export const getBooking = async({ pageNum, startDate, endDate, name, phone, code }) => {
    try {

        const token = splitStr(localStorage.getItem('token')).token
        const paginationLimit = 15;
        // Call API
        const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/get-booking?token=${token}&limit=${paginationLimit}&type=opportunity&offset=${pageNum > 0?(pageNum-1)*paginationLimit:pageNum*paginationLimit}&start_date=${startDate}&end_date=${endDate}&name=${name}&phone=${phone}&code=${code}`);
        const data = await response.json();

        if (!data) {
            return { message: data.message }
        }
        const count = data.data[0].count_no_limit;
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
        return { message: e };
    }
}