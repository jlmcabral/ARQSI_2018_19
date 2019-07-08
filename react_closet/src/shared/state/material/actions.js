import * as actionTypes from './actionTypes';

import axios from 'axios';

const apiUrl = 'http://closetisep.herokuapp.com/api';

export const getMaterial = () => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_MATERIAL_REQUEST });

        axios(`${apiUrl}/material`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_MATERIAL_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const getMaterialById = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.GET_MATERIAL_REQUEST });

        axios(`${apiUrl}/material/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.GET_MATERIAL_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                console.log(error);
            });
    }
);

export const deleteMaterial = (id) => (
    (dispatch) => {
        dispatch({ type: actionTypes.DELETE_MATERIAL_REQUEST });

        axios.delete(`${apiUrl}/material/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.DELETE_MATERIAL_SUCCESS,
                    payload: { data },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_MATERIAL_FAIL,
                });
                window.alert("Não é possivel apagar esse Material.");
                console.log(error);
            });
    }
);

export const createMaterial = (body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.CREATE_MATERIAL_REQUEST });

        axios.post(`${apiUrl}/material`, body)
            .then(({ data }) => {
                dispatch({
                    type: actionTypes.CREATE_MATERIAL_SUCCESS,
                    payload: { data: [data] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_MATERIAL_FAIL,
                });
                window.alert("Erro na criação! Por favor verifique os dados.");
                console.log(error);
            });
    }
);

export const editMaterial = (id, body) => (
    (dispatch) => {
        dispatch({ type: actionTypes.EDIT_MATERIAL_REQUEST });

        axios.put(`${apiUrl}/material/${id}`, body, { headers: { 'crossDomain': true } })
            .then(() => {
                dispatch({
                    type: actionTypes.EDIT_MATERIAL_SUCCESS,
                    payload: { data: [body] },
                });
            }).catch((error) => {
                dispatch({
                    type: actionTypes.EDIT_MATERIAL_FAIL,
                });
                window.alert("Alterações inválidas! Por favor verifique os dados.");
                console.log(error);
            });
    }
);
