import * as actionTypes from './actionTypes';

import axios from 'axios';

const apiUrl = 'https://closetisep.herokuapp.com/api';

export const getRestricao = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_RESTRICAO_REQUEST });

        axios(`${apiUrl}/restricao`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_RESTRICAO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getByRestricaoId = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_RESTRICAO_REQUEST });

        axios(`${apiUrl}/restricao/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_RESTRICAO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteRestricao = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_RESTRICAO_REQUEST });

        axios.delete(`${apiUrl}/restricao/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_RESTRICAO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_RESTRICAO_FAIL,
                });
                window.alert("Não é possivel apagar essa Restrição.");
                console.log(error);
            });
    }
);

export const createRestricao = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_RESTRICAO_REQUEST });

        axios.post(`${apiUrl}/restricao`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_RESTRICAO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_RESTRICAO_FAIL,
                });
                console.log(error);
            });
    }
);

export const editRestricao = (id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_RESTRICAO_REQUEST });

        axios.put(`${apiUrl}/restricao/${id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_RESTRICAO_SUCCESS,
                    payload: { data: [body] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_RESTRICAO_FAIL,
                });
                console.log(error);
            });
    }
);