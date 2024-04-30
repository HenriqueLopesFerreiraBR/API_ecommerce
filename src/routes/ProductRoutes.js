const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middleware/AuthMiddleware')

router.post("/",verifyTokenAndAdmin, ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.get("/title", ProductController.getByname);
router.put("/:id", verifyTokenAndAdmin, ProductController.update);
router.delete("/:id",verifyTokenAndAdmin, ProductController.delete);

module.exports = router;
