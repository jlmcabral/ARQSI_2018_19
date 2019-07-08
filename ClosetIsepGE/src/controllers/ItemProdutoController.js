const ItemProduto = require('../models/ItemProdutoModel');
const ItemProdutoService = require('../services/ItemProdutoService');
const DTO = require('../dtos/dto');

//Get All Itens
exports.getAll = function(req, res) {
    ItemProdutoService.getAll().then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        if(err == null){
            res.status(404).json("Not Found");
        }
        else {
            res.json(err);
        }
    });
};

//Get Catálogo
exports.getCatalogo = function(req, res) {
    ItemProdutoService.getAllProdutosCatalogo().then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.json(err);
    });
};


//Get Single Item
exports.getById = function(req, res) {
    ItemProdutoService.getById(req.params.id).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        if(err == null){
            res.status(404).json("Not Found");
        }
        else {
            res.json(err);
        }
    });
};

//Create Item
exports.create = function(req, res, next){
    var dto = DTO.itemDTO(req.body);

    ItemProdutoService.create(dto).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

exports.postItemsObrigatorios = function(req, res, next){
    ItemProdutoService.postPartesObrigatorias(req.body).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Update Item
exports.update = function(req, res){
    var dto = DTO.itemDTO(req.body);

    ItemProdutoService.update(req.params.id, dto).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Delete Item
exports.delete = function(req, res) {
    ItemProdutoService.delete(req.params.id).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};