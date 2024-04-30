const express = require("express");
const CartController = require("../controllers/CartController");
const router = express.Router();
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middleware/AuthMiddleware')

router.post("/", CartController.create);
router.get("/", CartController.getAll);
router.get("/:id", CartController.getById);
router.get("/find/:userId", CartController.getUserId);
router.put("/:id", CartController.update);
router.delete("/:id", CartController.delete);

module.exports = router;
