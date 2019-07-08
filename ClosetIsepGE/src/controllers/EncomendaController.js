const EncomendaService = require('../services/EncomendaService');
const DTO = require('../dtos/dto');

//Get All Encomendas
exports.getAll = function(req, res) {
    EncomendaService.getAll().then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Get Single Encomenda
exports.getById = function(req, res) {
    EncomendaService.getById(req.params.id).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Get all itens de encomenda
exports.getItens = function(req, res) {
    EncomendaService.getItens(req.params.id).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Get item de encomenda
exports.getItem = function(req, res) {
    EncomendaService.getItem(req.params.idEncomenda, req.params.idItem).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Create Encomenda
exports.create = function(req, res, next){
    let dto = DTO.encomendaDTO(req.body);

    EncomendaService.create(dto).then(function(values){
        res.status(201).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Update Encomenda
exports.update = function(req, res){
    let dto = DTO.encomendaDTO(req.body);
    
    EncomendaService.update(req.params.id,dto).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};

//Delete Encomenda
exports.delete = function(req, res) {
    EncomendaService.delete(req.params.id).then(function(values){
        res.status(200).json(values);
    }).catch(err =>{
        res.status(404).json(err);
    });
};