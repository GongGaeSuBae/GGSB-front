import * as Action from './Action'

const initialState = {
    searchArea: {city: '', district: ''},
    tabOptions: {tabOpened: false, tabType: 'info'},
    graphOption: '0',
    mapInfo: {
        center: {lat: 36.45133, lng: 128.534086},
        level: 10,
    }
}

const reducers = (state=initialState, action) => {
    const { type } = action;

    switch (type) {
        case Action.DISPATCH_SEARCH_CITY: {
            return {
                ...state,
                searchArea: {city: action.city, district: state.searchArea.district}
            };
        }
        case Action.DISPATCH_SEARCH_DISTRICT: {
            return {
                ...state,
                searchArea: {city: state.searchArea.city, district: action.district}
            };
        }
        case Action.TAB_TOGGLE: {
            return {
                ...state,
                tabOptions: {tabOpened: !state.tabOptions.tabOpened, tabType: state.tabOptions.tabopt}
            }
        }
        case Action.TAB_OPENED: {
            return {
                ...state,
                tabOptions: {tabOpened: true, tabType: state.tabOptions.tabopt}
            }
        }
        case Action.CHANGE_TAB_OPTION: {
            return {
                ...state,
                tabOptions: {tabOpened: state.tabOptions.tabOpened, tabType: action.tabopt}
            }
        }
        case Action.SELECT_GRAPH_OPTION: {
            return {
                ...state,
                graphOption: action.opt,
            }
        }
        case Action.CHANGE_MAP_CENTER: {
            return {
                ...state,
                mapInfo: {center: action.center, level: state.mapInfo.level}
            }
        }
        case Action.CHANGE_MAP_LEVEL: {
            return {
                ...state,
                mapInfo: {center: state.mapInfo.center, level: action.level}
            }
        }
        default: {
            return state;
        }
    }
}

export default reducers;