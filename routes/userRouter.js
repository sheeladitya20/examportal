const userController = require('../controllers/userController')

const router = require('express').Router()

// const auth = require('../middleware/auth');
const { authenticateToken } = require('../middleware/jwtMiddleware');


router.get('/',authenticateToken, userController.getUsers);
router.get('/:userId', userController.getOneUser);

router.get('/:userId/result', userController.getStudentResult);

router.post('/', userController.postUsers)
router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports=router;