// Action types
export const DISPATCH_SEARCH_CITY = 'DISPATCH_SEARCH_CITY';
export const DISPATCH_SEARCH_DISTRICT = 'DISPATCH_SEARCH_DISTRICT';
export const TAB_TOGGLE = 'TAB_TOGGLE';
export const TAB_OPENED = 'TAB_OPENED';

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

export const tabToggle = () => {
    return {
        type: TAB_TOGGLE,
    }
}

export const tabOpened = () => {
    return {
        type: TAB_OPENED,
    }
}