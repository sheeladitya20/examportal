const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/', examController.postExam);
router.get('/', examController.getExam);
router.put('/:examId', examController.updateExam);
router.delete('/:examId', examController.deleteExam);

module.exports = router;
