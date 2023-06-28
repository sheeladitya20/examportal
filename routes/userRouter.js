const userController = require('../controllers/userController')

const router = require('express').Router()

// const auth = require('../middleware/auth');
const { authenticateToken } = require('../middleware/jwtMiddleware');


router.get('/',authenticateToken, userController.getUsers);
router.post('/', userController.postUsers)
router.put('/:userId',authenticateToken, userController.updateUser);
router.delete('/:userId',authenticateToken, userController.deleteUser);

module.exports=router;