import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Errors";
import { Response } from "express";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enum/order.enum";



const orderService = new OrderService();

const orderController: T = {};
    

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
try {
		console.log("createOrder in orderController");

    const result= await orderService.createOrder(req.member, req.body)
	console.log(result);
	console.log("this is from order create controller");
	
    res.status(HttpCode.CREATED).json(result );
} catch (err) {
	console.log("Error createOrder, jarayoni", err);
	if (err instanceof Errors) {
		res.status(err.code).json(err);
	} else {
		res.status(Errors.standard.code).json(Errors.standard);
	}
}


};





orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
	try {
		console.log("getMyOrders in orderController");

		const { page, limit, orderStatus } = req.query;

		const inquiry: OrderInquiry = {
			page: Number(page),
			limit: Number(limit),
			orderStatus: orderStatus as OrderStatus,
		};

        console.log("reeq.quiry", inquiry);
        const result = await orderService.getMyOrders(req.member, inquiry);

		res.status(HttpCode.CREATED).json(result);
	} catch (err) {
		console.log("Error getMyOrders, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};

orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
	try {
		console.log("updateOrder in orderController");

        const input: OrderUpdateInput = req.body;
        const result = await orderService.updateOrder(req.member, input);
		
		res.status(HttpCode.OK).json(result);
	} catch (err) {
		console.log("Error updateOrder, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};

export default orderController;

