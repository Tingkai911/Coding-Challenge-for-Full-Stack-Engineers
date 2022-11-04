import express from "express";
import {
    getProducts,
    getProductBySku,
    deleteProduct,
    createProduct,
    updateProduct,
} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .get(protect, getProducts)
    .post(protect, admin, createProduct);
router
    .route("/:sku")
    .get(protect, getProductBySku)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;
