const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router();

router.post("/", OrderController.create);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.get("/:userId", OrderController.getUserId);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.delete);

module.exports = router;
