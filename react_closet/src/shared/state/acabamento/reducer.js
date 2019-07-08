import * as actionTypes from './actionTypes';

export const initialState = {
    loading: false,
    result: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case actionTypes.GET_ACABAMENTO_REQUEST:
        case actionTypes.CREATE_ACABAMENTO_REQUEST:
        case actionTypes.EDIT_ACABAMENTO_REQUEST:
        case actionTypes.DELETE_ACABAMENTO_REQUEST:
            return { ...state, loading: true };

        case actionTypes.GET_ACABAMENTO_SUCCESS:
            return { ...state, result: action.payload.data, loading: false };

        case actionTypes.CREATE_ACABAMENTO_SUCCESS:
        case actionTypes.EDIT_ACABAMENTO_SUCCESS:
            const newResult = state.result.filter((acab) => (acab.id !== action.payload.data[0].id))
            return { ...state, result: [...newResult, ...action.payload.data], loading: false };

        case actionTypes.DELETE_ACABAMENTO_SUCCESS:
            const result = state.result.filter((acab) => (acab.id !== action.payload.data.id));
            return {...state, result, loading: false};

        case actionTypes.GET_ACABAMENTO_FAIL:
        case actionTypes.CREATE_ACABAMENTO_FAIL:
        case actionTypes.EDIT_ACABAMENTO_FAIL:
        case actionTypes.DELETE_ACABAMENTO_FAIL:
            return { ...state, loading: false };

        case actionTypes.RESET:
            return initialState;

        default:
            return state;
    }
};
