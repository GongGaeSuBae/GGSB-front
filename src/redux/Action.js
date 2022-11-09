// Action types
export const DISPATCH_SEARCH_CITY = 'DISPATCH_SEARCH_CITY';
export const DISPATCH_SEARCH_DISTRICT = 'DISPATCH_SEARCH_DISTRICT';

export const TAB_TOGGLE = 'TAB_TOGGLE';
export const TAB_OPENED = 'TAB_OPENED';
export const CHANGE_TAB_OPTION = 'CHANGE_TAB_OPTION';
export const SELECT_GRAPH_OPTION = 'SELECT_GRAPH_OPTION';

export const CHANGE_MAP_CENTER = 'CHANGE_MAP_CENTER';
export const CHANGE_MAP_LEVEL = 'CHANGE_MAP_LEVEL';

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

export const changeTabOption = (tabopt) => {
    return {
        type: CHANGE_TAB_OPTION,
        tabopt: tabopt,
    }
}

export const selectGraphOption = (opt) => {
    return {
        type: SELECT_GRAPH_OPTION,
        opt: opt,
    }
}

export const changeMapCenter = (center) => {
    return {
        type: CHANGE_MAP_CENTER,
        center: center,
    }
}

export const changeMapLevel = (level) => {
    return {
        type: CHANGE_MAP_LEVEL,
        level: level,
    }
}