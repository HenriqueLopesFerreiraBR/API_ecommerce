const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.get("/username",AuthMiddleware.verifyTokenAndAdmin,UserController.getByUsername);
router.get("/", AuthMiddleware.verifyTokenAndAuthorization,UserController.getAll);
router.get("/email",AuthMiddleware.verifyTokenAndAuthorization,UserController.getByEmail);
router.get("/:id", AuthMiddleware.verifyTokenAndAuthorization ,UserController.getById);
router.put('/:id',AuthMiddleware.verifyTokenAndAuthorization,UserController.update);
router.delete('/:id',AuthMiddleware.verifyTokenAndAdmin,UserController.delete)
router.get('/stats', AuthMiddleware.verifyTokenAndAdmin, UserController.stats)

module.exports = router;
