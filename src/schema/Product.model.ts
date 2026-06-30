import mongoose, { Schema } from "mongoose";
import {
	ProductCollection,
	ProductSize,
	ProductStatus,
} from "../libs/enum/product.enum";



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
		variants: [
 {
	_id:false,
   size: { type: String },
   stock: { type: Number, default: 0 }
 }
],

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
