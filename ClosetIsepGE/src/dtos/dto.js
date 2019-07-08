exports.encomendaDTO = function(obj){
    return {
        nome: obj.nome,
        listaItens: obj.listaItens
    }
}

exports.itemDTO = function(obj) {
    return {
        produtoId:obj.produtoId,
        nome: obj.nome,
        largura: obj.largura,
        altura: obj.altura,
        profundidade: obj.profundidade,
        item: obj.item
    }
}

exports.produtoDTO = function(obj){
    return {
        id:obj.produtoId,
        nome: obj.nome,
        produtoId: obj.produtoId,
        largura: obj.largura,
        altura: obj.altura,
        profundidade: obj.profundidade
    }
}