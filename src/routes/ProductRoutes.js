const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.get("/title", ProductController.getByname);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
