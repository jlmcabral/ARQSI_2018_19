import * as actionTypes from './actionTypes';

import axios from 'axios';

const apiUrl = 'http://closetisep.herokuapp.com/api';

export const getDimensao = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_DIMENSAO_REQUEST });

        axios(`${apiUrl}/dimensao`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_DIMENSAO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getByDimensaoId = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_DIMENSAO_REQUEST });

        axios(`${apiUrl}/dimensao/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_DIMENSAO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteDimensao = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_DIMENSAO_REQUEST });

        axios.delete(`${apiUrl}/dimensao/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_DIMENSAO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_DIMENSAO_FAIL,
                });
                window.alert("Não é possivel apagar essa Dimensão.");
                console.log(error);
            });
    }
);

export const createDimensao = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_DIMENSAO_REQUEST });

        axios.post(`${apiUrl}/dimensao`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_DIMENSAO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_DIMENSAO_FAIL,
                });
                window.alert("Erro na criação! Por favor verifique o tipo de dados.");
                console.log(error);
            });
    }
);

export const editDimensao = (id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_DIMENSAO_REQUEST });

        axios.put(`${apiUrl}/dimensao/${id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_DIMENSAO_SUCCESS,
                    payload: { data: [body] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_DIMENSAO_FAIL,
                });
                console.log(error);
            });
    }
);