import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import {
	Order,
	OrderInquiry,
	OrderItemInput,
	OrderUpdateInput,
} from "../libs/types/order";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { ObjectId } from "mongoose";
import { OrderStatus } from "../libs/enum/order.enum";
import MemberService from "./member.service";
import ProductModel from "../schema/Product.model";

class OrderService {
	private readonly orderModel;
	private readonly orderItemModel;
	private readonly memberService;

	constructor() {
		this.orderModel = OrderModel;
		this.orderItemModel = OrderItemModel;
		this.memberService = new MemberService();
	
	}

	public async createOrder(
		member: Member,
		input: OrderItemInput[],
	): Promise<Order> {
		const memberId = shapeIntoMongooseObjectId(member._id);
		console.log("this is from order create service");
		console.log(input);


		const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
			return accumulator + item.itemPrice * item.itemQuantity;
		}, 0);

		const delivery = amount < 100 ? 5 : 0;
		console.log("values", amount, "---", delivery);
		try {
			//db da  hato bolsa  customized hatoligimiz bermoqchimiz

			const newOrder: Order = await this.orderModel.create({
				orderTotal: amount + delivery,
				orderDelivery: delivery,
				memberId: memberId,
			});
			const orderId = newOrder._id;
			console.log("orderid:", orderId);

			await this.recordOrderItem(orderId, input);

			return newOrder;
		} catch (err) {
			console.log("Error, model: createOrder", err);
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		}
	}

private async recordOrderItem(
	orderId: ObjectId,
	input: OrderItemInput[],
): Promise<void> {

	const promisedList = input.map(async (item: OrderItemInput) => {

		item.orderId = orderId;
		item.productId = shapeIntoMongooseObjectId(item.productId);

		// FIND PRODUCT
		const product = await ProductModel.findById(item.productId);

		if (!product) {
			throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
		}

		// FIND SELECTED VARIANT
		const variant = product.variants.find(
			(ele: any) => ele.size === item.selectedSize
		);

		if (!variant) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND);
		}

		// CHECK STOCK
		if (variant.stock < item.itemQuantity) {
			throw new Errors(
				HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND);
		}

		// REDUCE STOCK
		await ProductModel.updateOne(
			{
				_id: item.productId,
				"variants.size": item.selectedSize,
			},
			{
				$inc: {
					"variants.$.stock": -item.itemQuantity,
				},
			},
		);

		// SAVE ORDER ITEM
		await this.orderItemModel.create(item);

		return "INSERTED";
	});

	const orderItemsState = await Promise.all(promisedList);

	console.log("orderState", orderItemsState);
}

	public async getMyOrders(
		member: Member,
		inquiry: OrderInquiry,
	): Promise<Order[]> {
		console.log("getMyOrders");
		const memberId = shapeIntoMongooseObjectId(member._id);
		const matches = {
			memberId: memberId,
			orderStatus: inquiry.orderStatus,
		};
		const result = await this.orderModel
			.aggregate([
				{ $match: matches },
				{ $sort: { updatedAt: -1 } },
				{ $skip: (inquiry.page - 1) * inquiry.limit },
				{ $limit: inquiry.limit },
				{
					$lookup: {
						from: "orderItems",
						localField: "_id",
						foreignField: "orderId",
						as: "orderItems",
					},
				},
				{
					$lookup: {
						from: "products",
						localField: "orderItems.productId",
						foreignField: "_id",
						as: "productData",
					},
				},
			])
			.exec();

		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
		return result;
	}

	// public async getAllproducts(): Promise<Product[]> {
	// 	const result = await this.productModel.find().exec();

	// 	if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

	// 	return result;
	// }


public async getAllOrders(): Promise<any> {

	try {
			
	const result = await this.orderModel
			.aggregate([
				{
	$match: {
		orderStatus: "FINISH",
	},
},
					{
					$lookup: {
						from: "orderItems",
						localField: "_id",
						foreignField: "orderId",
						as: "orderItems",
					},
				},
				{
				$unwind: "$orderItems",
			},
				{
					$lookup: {
						from: "products",
						localField: "orderItems.productId",
						foreignField: "_id",
						as: "productData",
					},
				},
				{
				$unwind: "$productData",
			},
				{
					$lookup: {
						from: "members",
						localField: "memberId",
						foreignField: "_id",
						as: "memberData",
					},
				},
				{
				$unwind: "$memberData",
			},{
			$group: {
				_id: "$_id",

				customer: {
					$first: "$memberData.memberNick",
				},

				orderStatus: {
					$first: "$orderStatus",
				},

				orderTotal: {
					$first: "$orderTotal",
				},

				createdAt: {
					$first: "$createdAt",
				},

				items: {
					$push: {
						productName: "$productData.productName",
						quantity: "$orderItems.itemQuantity",
						
						size: "$orderItems.selectedSize",
						price: "$orderItems.itemPrice",
					},
				},
			},
		},

		// SORT
		{
			$sort: {
				createdAt: -1,
			},
		},
			
			
			])
			.exec();




console.log(result)
console.log(result[0].items)

		// if (!result.length) {
		// 	throw new Errors(
		// 		HttpCode.NOT_FOUND,
		// 		Message.NO_DATA_FOUND
		// 	);
		// }

		return result;
	} catch (err) {
		console.log("getAllOrders error:", err);
		throw err;
	}
}



	public async updateOrder(
		member: Member,
		input: OrderUpdateInput,
	): Promise<Order> {
		const memberId = shapeIntoMongooseObjectId(member._id);
		const orderId = shapeIntoMongooseObjectId(input.orderId);
		const orderStatus = input.orderStatus;

		const result = await this.orderModel
			.findOneAndUpdate(
				{
					memberId: memberId,
					_id: orderId,
				},
				{ orderStatus: orderStatus },
				{ new: true },
			)
			.exec();

		if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

		if (orderStatus === OrderStatus.PROCESS) {
			await this.memberService.addUserPoint(member, 1);
		}

		return result;
	}
}

export default OrderService;
