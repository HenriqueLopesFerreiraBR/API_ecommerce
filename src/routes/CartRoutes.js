const express = require("express");
const ProductController = require("../controllers/CartController");
const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.get("/:userId", ProductController.getUserId);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
