const userController = require('../controllers/userController')

const router = require('express').Router()

router.get('/', userController.getUsers);
router.get('/users', userController.postUsers)


module.exports=router