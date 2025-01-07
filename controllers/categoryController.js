import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name
            // ,description
        } = req.body;
        if (!name
            // || description
        )
            return res.status(401).send({
                success: false,
                message: "Name is required"
            })
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(401).send({
                success: false,
                message: "Category already exists"
            })
        }
        const newCategory = new categoryModel({
            name
            // , description
            , slug: slugify(name)
        });
        await newCategory.save();
        return res.status(200).send({
            success: true,
            message: "Category created successfully",
            newCategory
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating category"
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name
            // ,description
        } = req.body;
        const { id } = req.params;
        if (!name
            // || description
        )
            return res.status(401).send({
                success: false,
                message: "Name is required"
            })
        const existingCategory = await categoryModel.findById(id);
        if (!existingCategory) {
            return res.status(401).send({
                success: false,
                message: "Category not found"
            })
        }
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
            name
            // , description
            , slug: slugify(name)
        }, {
            new: true
        });
        return res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updatedCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating category",
            error
        })
    }
}


export const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).sort({ createdAt: -1 });
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No categories found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "All Categories",
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting all categories",
            error
        })
    }
}
export const getCategoryController = async (req, res) => {
    try {
        const { slug } = req.params
        const category = await categoryModel.findOne({ slug: slug });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "No category found"
            })
        }
        return res.status(200).send({
            success: true,
            message: slug + " " + "Category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting category",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "No category found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleting category",
            error
        })
    }
}