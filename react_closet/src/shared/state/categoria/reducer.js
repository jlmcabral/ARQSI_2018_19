import * as actionTypes from './actionTypes';

export const initialState = {
    loading: false,
    result: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case actionTypes.GET_CATEGORIA_REQUEST:
        case actionTypes.CREATE_CATEGORIA_REQUEST:
        case actionTypes.EDIT_CATEGORIA_REQUEST:
        case actionTypes.DELETE_CATEGORIA_REQUEST:
            return { ...state, loading: true };

        case actionTypes.GET_CATEGORIA_SUCCESS:
            return { ...state, result: action.payload.data, loading: false };

        case actionTypes.CREATE_CATEGORIA_SUCCESS:
        case actionTypes.EDIT_CATEGORIA_SUCCESS:
            const newResult = state.result.filter((cat) => (cat.id !== action.payload.data[0].id))
            return { ...state, result: [...newResult, ...action.payload.data], loading: false };

        case actionTypes.DELETE_CATEGORIA_SUCCESS:
            const result = state.result.filter((cat) => (cat.id !== action.payload.data.id));
            return {...state, result, loading: false};

        case actionTypes.GET_CATEGORIA_FAIL:
        case actionTypes.CREATE_CATEGORIA_FAIL:
        case actionTypes.EDIT_CATEGORIA_FAIL:
        case actionTypes.DELETE_CATEGORIA_FAIL:
            return { ...state, loading: false };

        case actionTypes.RESET:
            return initialState;

        default:
            return state;
    }
};