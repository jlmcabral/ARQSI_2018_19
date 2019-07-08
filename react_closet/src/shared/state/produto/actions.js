import * as actionTypes from './actionTypes';
import axios from 'axios';

const apiUrl = 'http://closetisep.herokuapp.com/api';

export const getProduto = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_PRODUTO_REQUEST });

        axios(`${apiUrl}/produto`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_PRODUTO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getProdutoById = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_PRODUTO_REQUEST });

        axios(`${apiUrl}/produto/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_PRODUTO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteProduto = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_PRODUTO_REQUEST });

        axios.delete(`${apiUrl}/produto/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_PRODUTO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_PRODUTO_FAIL,
                });
                window.alert("Não é possivel apagar esse Produto.");
                console.log(error);
            });
    }
);

export const createProduto = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_PRODUTO_REQUEST });

        axios.post(`${apiUrl}/produto`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_PRODUTO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_PRODUTO_FAIL,
                });
                window.alert("Erro na criação! Por favor verifique as dimensões.");
                console.log(error);
            });
    }
);

export const editProduto = (id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_PRODUTO_REQUEST });

        axios.put(`${apiUrl}/produto/${id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_PRODUTO_SUCCESS,
                    payload: { data: [body] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_PRODUTO_FAIL,
                });
                window.alert("Alterações inválidas! Por favor verifique os dados.");
                console.log(error);
            });
    }
);
