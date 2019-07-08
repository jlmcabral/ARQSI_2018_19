import * as actionTypes from './actionTypes';

import axios from 'axios';

 const apiUrl = 'http://closetisepge.herokuapp.com/api';

export const getItemProdutos = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ITEMPRODUTO_REQUEST });

        axios(`${apiUrl}/itemproduto`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ITEMPRODUTO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getByItemProdutoId = (_id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ITEMPRODUTO_REQUEST });

        axios(`${apiUrl}/itemproduto/${_id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ITEMPRODUTO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getItemProdutosCatalogo = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_ITEMPRODUTO_REQUEST });

        axios(`${apiUrl}/itemproduto/catalogo`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_ITEMPRODUTO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteItemProduto = (_id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_ITEMPRODUTO_REQUEST });

        axios.delete(`${apiUrl}/itemproduto/${_id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_ITEMPRODUTO_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_ITEMPRODUTO_FAIL,
                });
                window.alert("Não é possivel apagar esse ItemProduto.");
                console.log(error);
            });
    }
);

export const createItemProduto = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_ITEMPRODUTO_REQUEST });

        axios.post(`${apiUrl}/itemproduto`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_ITEMPRODUTO_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_ITEMPRODUTO_FAIL,
                });
                window.alert("Dimensões inválidas! A criação de um itemProduto falhou");
                console.log(error);
            });
    }
);

export const editItemProduto = (_id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_ITEMPRODUTO_REQUEST });

        axios.put(`${apiUrl}/itemproduto/${_id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_ITEMPRODUTO_SUCCESS,
                    payload: { data: [body] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_ITEMPRODUTO_FAIL,
                });
                window.alert("Não possível editar o itemProduto para essas dimensões");
                console.log(error);
            });
    }
);