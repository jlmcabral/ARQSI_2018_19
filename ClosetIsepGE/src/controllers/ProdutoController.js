const axios = require("axios");
const DTO = require('../dtos/dto');

const url = 'http://closetisep.herokuapp.com/';

//Get All Produtos
exports.getAllProducts = function () {
    return new Promise(function (fulfill, reject) {
        axios.get(url + 'api/produto')
            .then(function (response) {
                if (response.status == 200) {
                    fulfill(response.data);
                } else {
                    reject('Not Found');
                }
            })
            .catch(function (error) {
                reject('Not Found');
            });
    });
}

exports.getById = function (id) {
    return new Promise(function (fulfill, reject) {
        axios.get(url + 'api/produto/'+ id)
            .then(function (response) {
                if (response.status == 200) {
                    fulfill(response.data);
                } else {
                    reject('Not Found');
                }
            })
            .catch(function (error) {
                reject('Not Found');
            });
    });
}









/*
//IMPORTAR TODOS OS PRODUTOS
exports.getProdutoById = function (id) {
    return new Promise(function (fulfill, reject) {
        module.exports.allProducts.forEach(element => {
            if (element.id == id) {
                fulfill(element);
            }
        });
        reject(-1);
    });
};

//======================

exports.getAgregacao = function (idProduto) {
    return new Promise(function (fulfill, reject) {

        var uri = url + 'api/AgregacaoProdutoParte/getAgregacoes/' + idProduto;
        var options = {
            headers: { 'content-type': 'application/json' },
            url: uri,
            json: true
        }

        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                fulfill(body);
            }
            else {
                reject(error);
            }
        });
    });
}

//valida agregacao
exports.validaAgregacao = function (produto, parte) {
    return new Promise(function (fulfill, reject) {

        var uri = url + 'api/AgregacaoProdutoParte/valida';
        var bodyJson = { Produto: produto, Parte: parte };
        var options = {
            headers: { 'content-type': 'application/json' },
            url: uri,
            body: bodyJson,
            json: true
        }

        request.post(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                fulfill(true);
            }
            else {
                reject(false);
            }
        });
    });
}
*/