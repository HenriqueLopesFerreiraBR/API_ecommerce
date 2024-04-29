const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.get("/", AuthMiddleware.verifyTokenAndAuthorization,UserController.getAll);
router.get("/:id", UserController.getById);
router.get("/email",UserController.getByEmail);
router.get("/username",UserController.getByUsername);
router.put('/:id',UserController.update);
router.delete('/:id',UserController.delete)
router.get('/stats', AuthMiddleware.verifyTokenAndAdmin, UserController.stats)

module.exports = router;
