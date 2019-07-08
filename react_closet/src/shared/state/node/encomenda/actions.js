import * as actionTypes from './actionTypes';

import axios from 'axios';

const apiUrl = 'http://closetisepge.herokuapp.com/api';

export const getEncomendas = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ENCOMENDA_REQUEST });

        axios(`${apiUrl}/encomenda`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ENCOMENDA_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getByEncomendaId = (_id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ENCOMENDA_REQUEST });

        axios(`${apiUrl}/encomenda/${_id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ENCOMENDA_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getEncomendaItens = (_id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ENCOMENDA_REQUEST });

        axios(`${apiUrl}/encomenda/${_id}/itens`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ENCOMENDA_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteEncomenda = (_id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_ENCOMENDA_REQUEST });

        axios.delete(`${apiUrl}/encomenda/${_id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_ENCOMENDA_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_ENCOMENDA_FAIL,
                });
                window.alert("Não é possivel apagar essa encomenda.");
                console.log(error);
            });
    }
);

export const createEncomenda = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_ENCOMENDA_REQUEST });

        axios.post(`${apiUrl}/encomenda`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_ENCOMENDA_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_ENCOMENDA_FAIL,
                });
                window.alert("Não foi criar uma encomenda");
                console.log(error);
            });
    }
);

export const editEncomenda = (_id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_ENCOMENDA_REQUEST });

        axios.put(`${apiUrl}/encomenda/${_id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_ENCOMENDA_SUCCESS,
                    payload: { data: [body] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_ENCOMENDA_FAIL,
                });
                window.alert("Não foi possível editar a encomenda");
                console.log(error);
            });
    }
);