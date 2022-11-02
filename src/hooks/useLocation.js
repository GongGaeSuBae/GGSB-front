import API from '../api/API';
import { useEffect, useState } from 'react';

const useCities = () => {
    const [ cities, setCities ] = useState([]);
    useEffect(() => {
        const fetchCities = async() => {
            setCities(await API.findCities());
        }
        fetchCities();
    }, []);
    return { cities };
}

const useDistricts = (city) => {
    const [ districts, setDistricts ] = useState([]);
    useEffect(() => {
        const fetchDistricts = async() => {
            setDistricts(await API.findDistricts(city));
        }
        fetchDistricts();
    }, []);
    return { districts };
}

const useSelectLocation = (district) => {
    const [selectLocation, setSelectLocation ] = useState({});
    useEffect(() => {
        const fetchLocation = async() => {
            setSelectLocation(await API.findLocationByDistrict(district));
        }
        fetchLocation();
    }, []);
    return { selectLocation };
}

export { useCities, useDistricts, useSelectLocation }