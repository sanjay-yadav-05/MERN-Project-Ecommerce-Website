import express from "express";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import {createCategoryController, deleteCategoryController,  getAllCategoryController,  getCategoryController, updateCategoryController} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category",requireSignIn, isAdmin,createCategoryController);
router.put("/update-category/:id",requireSignIn, isAdmin,updateCategoryController);
router.get("/get-categories",getAllCategoryController);
router.get("/get-category/:slug",getCategoryController);
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);

export default router;