import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ message: "Name is required" });
        if (!description) return res.status(400).send({ message: "Description is required" });
        if (!price) return res.status(400).send({ message: "Price is required" });
        if (!quantity) return res.status(400).send({ message: "Quantity is required" });
        if (!category) return res.status(400).send({ message: "Category is required" });
        if (!image.data) return res.status(400).send({ message: "Image is required" });
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
        if (image.data.data !== null) {
            product.image = {
                data: fs.readFileSync(image.path),
                contentType: image.type,
            };
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
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error creating product",
            error: error.message,
        });
    }
};
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ message: "Name is required" });
        if (!description) return res.status(400).send({ message: "Description is required" });
        if (!price) return res.status(400).send({ message: "Price is required" });
        if (!quantity) return res.status(400).send({ message: "Quantity is required" });
        if (!category) return res.status(400).send({ message: "Category is required" });
        if (!image.data) return res.status(400).send({ message: "Image is required" });
        if (image.size > 1 * 1024 * 1024) {
            return res.status(400).send({ message: "Image size should be less than 1MB" });
        }

        // Update product instance
        const product = await productModel.findByIdAndUpdate(req.params.id, {
            name: name,
            slug:slugify(name),
            description: description,
            price: price,
            quantity: quantity,
            category: category,
            shipping: shipping
        }, {
            new: true
        });

        // Process image
        if (image.data.data !== null) {
            product.image = {
                data: fs.readFileSync(image.path),
                contentType: image.type,
            };
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
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error creating product",
            error: error.message,
        });
    }
};


export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-image").sort({ createdAt: -1 });
        if (!products) {
            return res.status(404).send({
                success: false,
                message: "No products found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "All products",
            totalProducts: products.length,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting all products",
            error
        })
    }
}
export const getProductController = async (req, res) => {
    try {
        const { slug } = req.params
        const product = await productModel.findOne({ slug: slug }).select("-image").populate("category");
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "No product found"
            })
        }
        return res.status(200).send({
            success: true,
            message: slug + " " + "product",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting product",
            error
        })
    }
}

export const getProductImageController = async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productModel.findById(pid).select("image")
        if (product.image.data) {
            res.set("Content-type", product.image.contentType)
            return res.status(200).send(product.image.data)
        }
        return res.status(404).send({
            success: false,
            message: "No product found"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting product image",
            error
        })
    }
}


export const deleteProductController = async(req,res)=>{
    try {
        const { pid } = req.params
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-image");
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "No product found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "product deleted successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleting product",
            error
        })
    }
}