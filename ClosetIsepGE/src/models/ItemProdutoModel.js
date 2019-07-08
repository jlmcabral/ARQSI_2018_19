const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

let ItemProdutoSchema = new Schema({
    produtoId : Number,
    nome : String,
    largura : Number,
    altura : Number,
    profundidade : Number,
    item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItemProduto' }],
},
{
    versionKey: false
});

ItemProdutoSchema.plugin(idvalidator);

module.exports = mongoose.model('ItemProduto', ItemProdutoSchema);