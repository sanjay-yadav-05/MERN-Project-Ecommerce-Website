import express from "express";
import formidable from "express-formidable";

import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import {createProductController, deleteProductController, getAllProductsController, getProductController, getProductCounts, getProductImageController, getSimilarProduct, productListController, searchProductController, updateProductController } from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product",requireSignIn,isAdmin,formidable({ multiples: false }),createProductController);
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable({ multiples: false }),updateProductController);
router.get("/get-products",getAllProductsController);
router.get("/get-product/:slug",getProductController);
router.get("/get-product-image/:pid",getProductImageController);
router.delete("/delete-product/:pid",requireSignIn,isAdmin,deleteProductController);
router.get("/search/:keyword",searchProductController)
router.get("/similar-product/:categoryId",getSimilarProduct);
router.get("/product-count",getProductCounts);
router.get("/product-list/:page",productListController);

export default router;