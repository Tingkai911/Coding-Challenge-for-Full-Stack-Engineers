import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import {v4 as uuidv4} from 'uuid';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    // How many products per page
    const pageSize = 3;

    // The current page, page = 1 by default
    const page = Number(req.query.pageNumber) || 1;

    // Get keyword from query string if it exists
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword, // Use regular expression
                $options: "i", // Case-insensitive
            },
        }
        : {};

    // Count how may products match the keyword
    const count = await Product.countDocuments({...keyword});

    // Takes in $regex and $option to perform search on the database
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    // Respond with the products, the current page number and the total number of pages
    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch single product by id
// @route   GET /api/products/:sku
// @access  Public
const getProductBySku = asyncHandler(async (req, res) => {
    const sku = req.params.sku
    const product = await Product.findOne({sku});
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:sku
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const sku = req.params.sku
    const product = await Product.findOne({sku});
    if (product) {
        await product.remove();
        res.json({message: "Product Removed"});
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        title: req.body.title,
        user: req.user._id,
        image: req.body.image,
        sku: uuidv4()
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:sku
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        title,
        image,
    } = req.body;

    const sku = req.params.sku

    const product = await Product.findOne({sku});

    if (product) {
        product.title = title;
        product.image = image;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export {
    getProducts,
    getProductBySku,
    deleteProduct,
    createProduct,
    updateProduct,
};
