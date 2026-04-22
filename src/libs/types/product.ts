
import { ObjectId } from "mongoose";

import {

	ProductSize,
	ProductStatus,
	ProductCollection,
} from "../enum/product.enum";



export interface Product {
	_id: ObjectId;
	productStatus: ProductStatus;
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productSize: ProductSize;
	productVolume: number;
	productDesc?: string;

	productViews: number;
	productImages: string[];
	createdAt: Date;
	updatedAt: Date;
}



export interface ProductInquiry { 
	order: string;
	page: number;
	limit: number;
	productCollection?: ProductCollection;
	search?: string;

}




export interface ProductInput {
	productStatus?: ProductStatus;
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;

	productViews?: number;
	productImages?: string[];
}


export interface ProductUpdateInput {
	_id: ObjectId;
	productStatust?: ProductStatus;
	productCollection?: ProductCollection;
	productName?: string;
	productPrice?: number;
	productLeftCount?: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;
	productViews?: number;
	productImages?: string[];
}

