const userController = require('../controllers/userController')

const router = require('express').Router()

const auth = require('../middleware/auth');

router.get('/', userController.getUsers);
router.post('/', userController.postUsers)
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports=router;