// Action types
export const DISPATCH_SEARCH_CITY = 'DISPATCH_SEARCH_CITY';
export const DISPATCH_SEARCH_DISTRICT = 'DISPATCH_SEARCH_DISTRICT';

// Action creators
export const dispatchSearchCity = (city) => {
    return {
        type: DISPATCH_SEARCH_CITY,
        city: city,
    }
}

export const dispatchSearchDistrict = (district) => {
    return {
        type: DISPATCH_SEARCH_DISTRICT,
        district: district
    }
}