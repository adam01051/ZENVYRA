import { ObjectId } from "mongoose";

import {
	ProductSize,
	ProductStatus,
	ProductCollection,
} from "../enum/product.enum";

/* Size Variant */
export interface ProductVariant {
	size: ProductSize;
	stock: number;
}

/* Product Model */
export interface Product {
	_id: ObjectId;

	productStatus: ProductStatus;
	productCollection: ProductCollection;

	productName: string;
	productPrice: number;

	variants: ProductVariant[];

	productDesc?: string;

	productViews: number;
	productImages: string[];

	createdAt: Date;
	updatedAt: Date;
}

/* Search / Pagination */
export interface ProductInquiry {
	order: string;
	page: number;
	limit: number;

	productCollection?: ProductCollection;
	search?: string;
}

/* Create Product */
export interface ProductInput {
	productStatus?: ProductStatus;
	productCollection: ProductCollection;

	productName: string;
	productPrice: number;

	sizes: string;
	stockS: number;
	stockM: number;
	stockL: number;
	stockXL: number;
	stockXXL: number;


	productDesc?: string;

	productViews?: number;
	productImages?: string[];
}





/* Update Product */
export interface ProductUpdateInput {
	_id: ObjectId;

	productStatus?: ProductStatus;
	productCollection?: ProductCollection;

	productName?: string;
	productPrice?: number;

	variants?: ProductVariant[];

	productDesc?: string;

	productViews?: number;
	productImages?: string[];
}
