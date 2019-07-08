import * as actionTypes from './actionTypes';

export const initialState = {
    loading: false,
    result: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case actionTypes.GET_ITEMPRODUTO_REQUEST:
        case actionTypes.CREATE_ITEMPRODUTO_REQUEST:
        case actionTypes.EDIT_ITEMPRODUTO_REQUEST:
        case actionTypes.DELETE_ITEMPRODUTO_REQUEST:
            return { ...state, loading: true };

        case actionTypes.GET_ITEMPRODUTO_SUCCESS:
            return { ...state, result: action.payload.data, loading: false };

        case actionTypes.CREATE_ITEMPRODUTO_SUCCESS:
        case actionTypes.EDIT_ITEMPRODUTO_SUCCESS:
            const newResult = state.result.filter((item) => (item['_id'] !== action.payload.data[0]['_id']))
            return { ...state, result: [...newResult, ...action.payload.data], loading: false };

        case actionTypes.DELETE_ITEMPRODUTO_SUCCESS:
            const result = state.result.filter((item) => (item['_id'] !== action.payload.data['_id']));
            return {...state, result, loading: false};

        case actionTypes.GET_ITEMPRODUTO_FAIL:
        case actionTypes.CREATE_ITEMPRODUTO_FAIL:
        case actionTypes.EDIT_ITEMPRODUTO_FAIL:
        case actionTypes.DELETE_ITEMPRODUTO_FAIL:
            return { ...state, loading: false };

        case actionTypes.RESET:
            return initialState;

        default:
            return state;
    }
};
