import * as Action from './Action'

const initialState = {
   city: '',
   district: '',
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
        default: {
            return state;
        }
    }
}

export default reducers;