const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

let EncomendaSchema = new Schema({
    nome : String,
    listaItens : [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}]
},
{
    versionKey: false
});

EncomendaSchema.plugin(idvalidator);

module.exports = mongoose.model('Encomenda', EncomendaSchema);