import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
