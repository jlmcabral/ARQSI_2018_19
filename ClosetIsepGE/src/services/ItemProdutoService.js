const mongoose = require('mongoose');
const request = require("request");
const ItemProduto = require('../models/ItemProdutoModel');
const ProdutoController = require('../controllers/ProdutoController');
const DimensaoController = require('../controllers/DimensaoController');
const DTO = require('../dtos/dto');

//Get All Item
exports.getAll = function () {
    return new Promise(function (fulfill, reject) {
        ItemProduto.find({}, function (err, all) {
            if (err) {
                reject(err);
            }
            else if (!all || all.length <= 0) {
                reject(null);
            }
            else {
                fulfill(all);
            }
        });
    });
};

//Get by ID Item
exports.getById = function (id) {
    return new Promise(function (fulfill, reject) {
        ItemProduto.findById(id, function (err, item) {
            if (err) {
                reject(err);
            }
            else if (!item) {
                reject(item);
            }
            else {
                fulfill(item);
            }
        });
    });
};

exports.getItensById = function (id) {
    return new Promise(function (fulfill, reject) {
        ItemProduto.find({ '_id': { $in: id.map(x => mongoose.Types.ObjectId(x)) } }, function (err, item) {
            if (err) {
                reject(err);
            }
            else if (!item) {
                reject(item);
            }
            else {
                fulfill(item);
            }
        });
    });
};

//Get All Produtos do Catálogo
exports.getAllProdutosCatalogo = function () {
    return new Promise(function (fulfill, reject) {
        ProdutoController.getAllProducts().then(function (values) {
            fulfill(values);
        }).catch(err => {
            reject(err);
        });
    });
};


//Create Item
exports.create = function (dto) {
    return new Promise(function (fulfill, reject) {
        ProdutoController.getById(dto.produtoId).then(function (values) {
            if (values != 'Not Found' && dto.item.every(x => values.produtoId.some(k => k == x))) {
                DimensaoController.getById(values.dimensaoId).then(function (values2) {
                    if (values2 != 'Not Found') {
                        
                        const isValidDimensions = dto.largura >= values2.lmin && dto.largura <= values2.lmax &&
                            dto.altura >= values2.amin && dto.altura <= values2.amax &&
                            dto.profundidade >= values2.pmin && dto.profundidade <= values2.pmax;
                            
                        const isValid = dto.item.every(x => ItemProduto.findById(x, function (err, item) {
                            return values.produtoId.some(k => k == item.produtoId);
                        }));

                        if (isValid && isValidDimensions) {
                            let item = new ItemProduto(
                                {
                                    produtoId: dto.produtoId,
                                    nome: dto.nome,
                                    largura: dto.largura,
                                    altura: dto.altura,
                                    profundidade: dto.profundidade,
                                    item: dto.item
                                }
                            );

                            item.save(function (err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    fulfill(item);
                                }
                            });
                        } else {
                            console.log(values2);
                            reject('Not Found');
                        }
                    } else {
                        reject('Not Found');
                    }
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject(values);
            }
        }).catch(err => {
            reject(err);
        });
    });
    
};



//Update Item
exports.update = function (id, dto) {
    return new Promise(function (fulfill, reject) {
        ProdutoController.getById(dto.produtoId).then(function (values) {
            if (values != 'Not Found' && dto.item.every(x => values.produtoId.some(k => k == x))) {
                DimensaoController.getById(values.dimensaoId).then(function (values2) {
                    if (values2 != 'Not Found') {
                        
                        const isValidDimensions = dto.largura >= values2.lmin && dto.largura <= values2.lmax &&
                            dto.altura >= values2.amin && dto.altura <= values2.amax &&
                            dto.profundidade >= values2.pmin && dto.profundidade <= values2.pmax;
                            
                        const isValid = dto.item.every(x => ItemProduto.findById(x, function (err, item) {
                            return values.produtoId.some(k => k == item.produtoId);
                        }));

                        if (isValid && isValidDimensions) {
                            ItemProduto.findByIdAndUpdate(id, { $set: dto }, function (err, item) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    fulfill(item);
                                }
                            });
                        } else {
                            console.log(values2);
                            reject('Not Found');
                        }
                    } else {
                        reject('Not Found');
                    }
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject(values);
            }
        }).catch(err => {
            reject(err);
        });
    });
    
};

//Delete Item
exports.delete = function (id) {
    return new Promise(function (fulfill, reject) {
        ItemProduto.findByIdAndRemove(id, function (err, item) {
            if (err) {
                reject(err);
            }
            else if (!item) {
                reject(item);
            }
            else {
                fulfill(id);
            }
        });
    });
};