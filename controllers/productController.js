import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";

// Function to handle image processing
const processImage = (image) => {
    try {
        if (image && image.path) {
            return {
                data: fs.readFileSync(image.path),
                contentType: image.type,
            };
        }
        return null;
    } catch (err) {
        console.error("Error processing image:", err.message);
        return null;
    }
};

// Create Product Controller
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name || name.trim() === "") return res.status(400).send({ message: "Name is required" });
        if (!description || description.trim() === "") return res.status(400).send({ message: "Description is required" });
        if (!price || price <= 0) return res.status(400).send({ message: "Price must be greater than 0" });
        if (quantity < 0) return res.status(400).send({ message: "Quantity must be 0 or more" });
        if (!category) return res.status(400).send({ message: "Category is required" });
        if (!image) return res.status(400).send({ message: "Image is required" });
        if (!["image/jpeg", "image/png", "image/gif"].includes(image.type)) {
            return res.status(400).send({ message: "Invalid image format" });
        }
        if (image.size > 1 * 1024 * 1024) {
            return res.status(400).send({ message: "Image size should be less than 1MB" });
        }

        // Create product instance
        const product = new productModel({
            name,
            slug: slugify(name),
            description,
            price,
            quantity,
            category,
            shipping,
        });

        // Process image
        const processedImage = processImage(image);
        if (processedImage) {
            product.image = processedImage;
        } else {
            return res.status(400).send({ message: "Image file is empty" });
        }

        // Save product
        await product.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).send({
            success: false,
            message: "Error creating product",
            error: error.message,
        });
    }
};





// Update Product Controller
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping } = req.fields;
        const { image } = req.files;
        const { pid } = req.params;
        console.log(pid)
        // Validation
        if (!name) return res.status(400).send({ message: "Name is required" });
        if (!description) return res.status(400).send({ message: "Description is required" });
        if (!price) return res.status(400).send({ message: "Price is required" });
        if (!quantity) return res.status(400).send({ message: "Quantity is required" });
        if (!category) return res.status(400).send({ message: "Category is required" });

        // Find the product to update
        const product = await productModel.findById(pid);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }

        // Update product instance
        product.name = name;
        product.slug = slugify(name);
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.category = category;
        product.shipping = shipping;

        // Process image if provided
        if (image) {
            if (image.size > 1 * 1024 * 1024) {
                return res.status(400).send({ message: "Image size should be less than 1MB" });
            }

            const processedImage = processImage(image);
            if (processedImage) {
                product.image = processedImage;
            } else {
                return res.status(400).send({ message: "Image file is empty" });
            }
        }

        // Save updated product
        await product.save();
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating product",
            error: error.message,
        });
    }
};

// Get All Products Controller
export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-image").sort({ createdAt: -1 });
        if (!products || products.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No products found",
            });
        }
        return res.status(200).send({
            success: true,
            message: "All products fetched successfully",
            totalProducts: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting all products",
            error,
        });
    }
};

// Get Product by Slug Controller
export const getProductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug }).select("-image").populate("category");
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "No product found",
            });
        }
        return res.status(200).send({
            success: true,
            message: `${slug} product fetched successfully`,
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting product",
            error,
        });
    }
};

// Get Product Image Controller
export const getProductImageController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid).select("image");
        if (product.image && product.image.data) {
            res.set("Content-type", product.image.contentType);
            return res.status(200).send(product.image.data);
        }
        return res.status(404).send({
            success: false,
            message: "No product image found",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting product image",
            error,
        });
    }
};

// Delete Product Controller
export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findByIdAndDelete(pid).select("-image");
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "No product found",
            });
        }
        return res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting product",
            error,
        });
    }
};


export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params; // Use req.query for search keyword
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-image");
        
        res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in searching product",
            error,
        });
    }
};
