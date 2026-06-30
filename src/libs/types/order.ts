import { ObjectId } from 'mongoose';
import { OrderStatus } from '../enum/order.enum';
import { Product } from "./product";
import { ProductSize } from '../enum/product.enum';


export interface OrderItem {
	_id: ObjectId;
	itemQuantity: number;
	itemPrice: number;
	selectedSize: ProductSize;
	productId: ObjectId;
	orderId: ObjectId;
	createdAt: Date;
	updatedAt: Date;
}




export interface OrderItemInput {
	itemQuantity: number;
	itemPrice: number;

	productId: ObjectId;
	orderId?: ObjectId;	
	selectedSize: ProductSize;
}


export interface Order {
	_id: ObjectId;
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	memberId: ObjectId;
	createdAt: Date;
	updatedAt: Date;

	//from agregations
	orderItems: OrderItem[];
	productData: Product[];
}


export interface OrderInquiry {
	page: number;
	limit: number;
	orderStatus: OrderStatus;
}

export interface OrderUpdateInput{
	orderId: string;
	orderStatus: OrderStatus;
	
}