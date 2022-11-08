import * as Action from './Action'

const initialState = {
   city: '',
   district: '',
   tabOpened: false,
   graphOption: '0',
}

const reducers = (state=initialState, action) => {
    const { type } = action;

    switch (type) {
        case Action.DISPATCH_SEARCH_CITY: {
            return {
                ...state,
                city: action.city,
            };
        }
        case Action.DISPATCH_SEARCH_DISTRICT: {
            return {
                ...state,
                district: action.district,
            };
        }
        case Action.TAB_TOGGLE: {
            return {
                ...state,
                tabOpened: !state.tabOpened,
            }
        }
        case Action.TAB_OPENED: {
            return {
                ...state,
                tabOpened: true,
            }
        }
        case Action.SELECT_GRAPH_OPTION: {
            return {
                ...state,
                graphOption: action.opt,
            }
        }
        default: {
            return state;
        }
    }
}

export default reducers;