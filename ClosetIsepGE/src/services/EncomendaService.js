const Encomenda = require('../models/EncomendaModel');
const ItemService = require('../services/ItemProdutoService');

//Get All Encomendas
exports.getAll = function() {
    return new Promise(function(fulfill, reject){
        Encomenda.find({}, function(err, encomenda){
            if(err){
                reject(err);
            }
            else {
                fulfill(encomenda);
            }
        });
    });
};

//Get by ID Encomenda
exports.getById = function(id) {
    return new Promise(function(fulfill, reject){
        Encomenda.findById(id, function(err, encomenda){
            if(err){
                reject(err);
            }
            else {
                fulfill(encomenda);
            }
        });
    });
};

//Get all itens de encomenda
exports.getItens = function(id) {
    return new Promise(function(fulfill, reject){
        Encomenda.findById(id, function(err, encomenda){
            if(err){
                reject(err);
            }
            else {
                ItemService.getItensById(encomenda.listaItens).then(function(values){
                    fulfill(values);
                }).catch(err => {
                    reject(err);
                })
            }
        });
    });
};


//Get one item por id
exports.getItem = function(idEncomenda, idItem) {
    return new Promise(function(fulfill, reject){
        Encomenda.findById(idEncomenda, function(err, encomenda){
            if(err){
                reject(err);
            } else if(encomenda.listaItens.some(x => x == idItem)){
                ItemService.getById(idItem).then(function(values){
                    fulfill(values);
                }).catch(err => {
                    reject(err);
                })
            } else {
                reject('Not found');
            }
        });
    });
};

//Create Encomenda
exports.create = function(dto){
    return new Promise(function(fulfill, reject){
        //Criar Encomenda
        let encomenda = new Encomenda(
            {
                nome: dto.nome,
                listaItens: dto.listaItens
            }
        );

        //Guardar Encomenda
        encomenda.save(function(err){
            if(err){
                reject(err);
            }
            else {
                fulfill(encomenda);
            }
        });
    });
};

//Update Encomenda
exports.update = function(id, dto){
    //VERIFICAR SE ITENS EXISTEM
    return new Promise(function(fulfill, reject){
        Encomenda.findByIdAndUpdate(id, {$set: dto}, function(err, encomenda){
            if(err){
                reject(err);
            }
            else {
                fulfill(encomenda);
            }
        });
    });
};

//Delete Encomenda
exports.delete = function(id) {
    return new Promise(function(fulfill, reject){
        Encomenda.findByIdAndRemove(id, function (err, encomenda) {
            if (err) {
                reject(err);
            }
            else if(!encomenda){
                reject(encomenda);
            }
            else {
                fulfill(id);
            }
        });
    });
};