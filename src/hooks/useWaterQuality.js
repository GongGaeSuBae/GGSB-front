import API from './api/API';
import { useEffect, useState } from 'react';

const useSingleWaterQuality= (city, district) => {
    const [ singleWaterQuality, setSingleWaterQuality ] = useState(null);
    useEffect(() => {
        const fetchSingleWaterQuality = async() => {
            setSingleWaterQuality(await API.searchWaterQualityByDistrict(city, district));
        }
        fetchSingleWaterQuality();
    }, []);
    return { singleWaterQuality };
}

const useMultipleWaterQuality = () => {
    const [ multipleWaterQuality, setMultipleWaterQuality ] = useState([]);
    useEffect(() => {
        const fetchMultipleWaterQuality = async() => {
            setMultipleWaterQuality(await API.searchWaterQualityCompact());
        }
        fetchMultipleWaterQuality();
    }, []);
    return { multipleWaterQuality };
}

const useWaterQualityGraphData = () => {
    const [ waterQualityGraphData, setWaterQualityGraphData ] = useState([]);
    useEffect(() => {
        const fetchWaterQualityGraphData = async() => {
            setWaterQualityGraphData(await API.showWaterQualityGraph());
        }
        fetchWaterQualityGraphData();
    }, []);
    return { waterQualityGraphData };
}

export { useSingleWaterQuality, useMultipleWaterQuality, useWaterQualityGraphData }