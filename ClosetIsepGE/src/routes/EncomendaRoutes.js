const express = require('express');
const router = express.Router();

const encomenda_controller = require('../controllers/EncomendaController');

router.get('/', encomenda_controller.getAll);
router.get('/:id', encomenda_controller.getById);
router.get('/:id/itens', encomenda_controller.getItens);
router.get('/:idEncomenda/itens/:idItem', encomenda_controller.getItem);
router.post('/', encomenda_controller.create);
router.put('/:id', encomenda_controller.update);
router.delete('/:id', encomenda_controller.delete);

module.exports = router;