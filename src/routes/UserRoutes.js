const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.get("/email",UserController.getByEmail);
router.get("/username",UserController.getByUsername);
router.put('/:id',UserController.update);
router.delete('/:id',UserController.delete)

module.exports = router;
