import API from './api/API';
import { useEffect, useState } from 'react';

const useSingleWaterQuality= (district) => {
    const [ singleWaterQuality, setSingleWaterQuality ] = useState({});
    useEffect(() => {
        const fetchSingleWaterQuality = async() => {
            setSingleWaterQuality(await API.searchWaterQualityByDistrict(district));
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