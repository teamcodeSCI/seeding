import { splitStr } from "../util/splitStr.js";
import { formatDate } from "../util/util.js";

export const getLead = async({ pageNum, name, phone, service, fb, branch, startDate, endDate }) => {
    try {
        const token = splitStr(localStorage.getItem('token')).token
        const paginationLimit = 15;
        // Call API
        const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/get-form?token=${token}&brand_id=${''}&type=seeding&limit=${paginationLimit}&offset=${pageNum > 0?pageNum-1:pageNum}&company_id=${branch}&name_fb=${fb}&phone=${phone}&service=${service}&name=${name}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`);
        const data = await response.json();
        console.log("data: ", data);

        if (!data.data) {
            return { message: data.message }
        }
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
        return { message: e };
    }
};
export const createLead = async({ name = 'Đức', phone = '0123456789', nameFb = 'Đức Đoàn', linkFb = '123123', service = 'Niềng răng', branch = 'KN.HCM.01', script = 'Kịch bản', note = 'sấdas', interactive = 'ádasd' }) => {
    try {
        const token = splitStr(localStorage.getItem('token')).token
        const response = await fetch(`https://scigroup.com.vn/cp/seeding/api/create-form?token=${token}&name=${name}&phone=${phone}&link_fb=${linkFb}&name_fb=${nameFb}&service=${service}&note=${note}&script=${script}&interactive_proof=${interactive}&company_id=${branch}&type=seeding`)
        console.log("response: ", await response.json());
    } catch (e) {
        console.log(e);
        return {
            message: e
        }
    }

}