import { axiosInstance } from "./AxiosInstance";

const todayUtil = () => {
    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth()+1).slice(-2));
    var day = ('0' + now.getDate().slice(-2));

    var todayParam = year+'-'+month+'-'+day;
    var hourParam = ('0' + now.getHours().slice(-2));
    return todayParam, hourParam;
}

const API = {
    findCities: async() => {
        const res = await axiosInstance.get(`/location?state=경상북도`);
        return res;
    },
    findDistricts: async(city) => {
        const res = await axiosInstance.get(`/location?city=${city}`);
        return res;
    },
    findLocationByDistrict: async(district) => {
        const res = await axiosInstance.get(`/location?district=${district}`);
        return res;
    },
    searchWaterQualityByDistrict: async(district) => {
        const {today, hour } = todayUtil();
        const res = await axiosInstance.get(`/waterquality?district=${district}&today=${today}&hour=${hour}`);
        return res;
    },
    searchWaterQualityCompact: async() => {
        const { today, hour } = todayUtil();
        const res = await axiosInstance.get(`/waterquality?today=${today}&hour=${hour}`);
        return res;
    },
    showWaterQualityGraph: async(district, opt) => {
        const { today } = todayUtil();
        const res = await axiosInstance.get(`/waterquality/graph?district=${district}&startDay=${today}&range=${opt}`);
        return res;
    }

}

export default API;