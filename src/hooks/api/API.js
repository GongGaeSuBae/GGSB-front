import { axiosInstance } from "./AxiosInstance";
import { getTodayParameter } from "../../utils/Date";

const API = {
    findCities: async() => {
        const res = await axiosInstance.get(`/location?state=경상북도`);
        return res.data.city;
    },
    findDistricts: async(city) => {
        const res = await axiosInstance.get(`/location?city=${city}`);
        return res.data.district;
    },
    findLocationByDistrict: async(district) => {
        const res = await axiosInstance.get(`/location?district=${district}`);
        return res;
    },
    searchWaterQualityByDistrict: async(city, district) => {
        const {today, hour } = getTodayParameter();
        const res = await axiosInstance.get(`/waterquality?city=${city}&district=${district}&today=${today}&hour=${hour}`);
        return res;
    },
    searchWaterQualityCompact: async() => {
        const { today, hour } = getTodayParameter();
        const res = await axiosInstance.get(`/waterquality?today=${today}&hour=${hour}`);
        return res;
    },
    showWaterQualityGraph: async(city, district) => {
        const { today } = getTodayParameter();
        const res = await axiosInstance.get(`/waterquality/graph?city=${city}&district=${district}&startDay=${today}`);
        return res;
    }

}

export default API;