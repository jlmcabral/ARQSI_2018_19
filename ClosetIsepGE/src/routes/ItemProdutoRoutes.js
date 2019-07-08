const express = require('express');
const router = express.Router();

const itemProduto_controller = require('../controllers/ItemProdutoController');

router.get('/', itemProduto_controller.getAll);
router.post('/', itemProduto_controller.create);
router.get('/catalogo', itemProduto_controller.getCatalogo);
router.get('/:id', itemProduto_controller.getById);
router.put('/:id', itemProduto_controller.update);
router.delete('/:id', itemProduto_controller.delete);

module.exports = router;