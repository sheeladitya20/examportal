const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.postResult);
router.put('/:resultId', resultController.updateResult);
router.delete('/:resultId', resultController.deleteResult);
router.get('/', resultController.getAllResults);

module.exports = router;
