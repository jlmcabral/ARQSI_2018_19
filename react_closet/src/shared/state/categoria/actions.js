import * as actionTypes from './actionTypes';

import axios from 'axios';

const apiUrl = 'http://closetisep.herokuapp.com/api';

export const getCategoria = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_CATEGORIA_REQUEST });

        axios(`${apiUrl}/categoria`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_CATEGORIA_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getCategoriaById = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_CATEGORIA_REQUEST });

        axios(`${apiUrl}/categoria/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_CATEGORIA_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteCategoria = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_CATEGORIA_REQUEST });

        axios.delete(`${apiUrl}/categoria/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_CATEGORIA_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_CATEGORIA_FAIL,
                });
                window.alert("Não é possivel apagar esse Categoria.");
                console.log(error);
            });
    }
);

export const createCategoria = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_CATEGORIA_REQUEST });

        axios.post(`${apiUrl}/categoria`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_CATEGORIA_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_CATEGORIA_FAIL,
                });
                window.alert("Erro na criação! Por favor verifique os dados.");
                console.log(error);
            });
    }
);

export const editCategoria = (id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_CATEGORIA_REQUEST });

        axios.put(`${apiUrl}/categoria/${id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_CATEGORIA_SUCCESS,
                    payload: { data: [body] },
                });
                console.log(body);
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_CATEGORIA_FAIL,
                });
                window.alert("Alterações inválidas! Por favor verifique os dados.");
                console.log(error);
            });
    }
);