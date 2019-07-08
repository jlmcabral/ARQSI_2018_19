import * as actionTypes from './actionTypes';

import axios from 'axios';

const apiUrl = 'http://closetisep.herokuapp.com/api';

export const getAcabamento = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ACABAMENTO_REQUEST });

        axios(`${apiUrl}/acabamento`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ACABAMENTO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getByAcabamentoId = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ACABAMENTO_REQUEST });

        axios(`${apiUrl}/acabamento/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ACABAMENTO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteAcabamento = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_ACABAMENTO_REQUEST });

        axios.delete(`${apiUrl}/acabamento/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_ACABAMENTO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_ACABAMENTO_FAIL,
                });
                window.alert("Não é possivel apagar esse Acabamento.");
                console.log(error);
            });
    }
);

export const createAcabamento = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_ACABAMENTO_REQUEST });

        axios.post(`${apiUrl}/acabamento`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_ACABAMENTO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_ACABAMENTO_FAIL,
                });
                console.log(error);
            });
    }
);

export const editAcabamento = (id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_ACABAMENTO_REQUEST });

        axios.put(`${apiUrl}/acabamento/${id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_ACABAMENTO_SUCCESS,
                    payload: { data: [body] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_ACABAMENTO_FAIL,
                });
                console.log(error);
            });
    }
);