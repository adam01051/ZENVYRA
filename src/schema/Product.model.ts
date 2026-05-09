import mongoose, { Schema } from "mongoose";
import {
	ProductCollection,
	ProductSize,
	ProductStatus,
} from "../libs/enum/product.enum";

/* Size Variant Schema */
const variantSchema = new Schema(
	{
		size: {
			type: String,
			enum: ProductSize,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ _id: false },
);

/* Product Schema */
const productSchema = new Schema(
	{
		productStatus: {
			type: String,
			enum: ProductStatus,
			default: ProductStatus.PAUSE,
		},

		productCollection: {
			type: String,
			enum: ProductCollection,
			required: true,
		},

		productName: {
			type: String,
			required: true,
			trim: true,
		},

		productPrice: {
			type: Number,
			required: true,
			min: 0,
		},

		/* NEW INVENTORY SYSTEM */
		variants: {
			type: [variantSchema],
			default: [],
		},

		productDesc: {
			type: String,
			default: "",
		},

		productImages: {
			type: [String],
			default: [],
		},

		productViews: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

/* Unique Product Name + Category */
productSchema.index(
	{
		productName: 1,
		productCollection: 1,
	},
	{
		unique: true,
	},
);

export default mongoose.model("Product", productSchema);
