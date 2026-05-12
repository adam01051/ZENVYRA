import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import ProductService from "../models/Product.service";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductCollection } from "../libs/enum/product.enum";


const productService = new ProductService();
const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
	try {
		console.log("getAllProducts");

		const data = await productService.getAllproducts();
	
		console.log("this is get all products  info coming from db");
		
		res.render("products", { products: data });
		
	} catch (err) {
		console.log("Error getAllProducts, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};

productController.createNewProduct = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("createNewProducts");
	
		

		if (!req.files?.length)
			throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

		const data: ProductInput = req.body;

		
		data.productImages = req.files?.map((ele) => {
			return ele.path;
		});
		await productService.createNewProduct(data);

		res.send(
			`<script> alert("successfully creation "); window.location.replace('/admin/product/all')</script>`,
		);
	} catch (err) {
		console.log("Error createNewProducts, jarayoni", err);
		const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

		res.send(
			`<script> alert("${message} failed creation "); window.location.replace('/admin/product/all')</script>`,
		);
	}
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
	try {
        console.log("updateChosenProducts");
				const id = req.params.id as string;
				const result = await productService.updateChosenProduct(id, req.body);

		res.status(HttpCode.OK).json({ data: result });
	} catch (err) {
		console.log("Error updateChosenProducts, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};


productController.getProducts = async (req: Request, res: Response) => {
	try {
		console.log("getProducts");
		const { page, limit, order, productCollection, search } = req.query;
		const inquiry: ProductInquiry = {
			order: String(order),
			page: Number(page),
			limit: Number(limit),
		};
		if (productCollection) {
			inquiry.productCollection = productCollection as ProductCollection;
		}
		if (search) {
			inquiry.search = String(search);
		}
		console.log("getProducts",inquiry);
		const result = await productService.getProducts(inquiry);

		res.status(HttpCode.OK).json(result);
	} catch (err) {
		console.log("Error getProducts, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};



productController.getProduct = async (req: ExtendedRequest, res: Response) => {
	try {
		console.log("getProduct");
		const { id } = req.params;
		const memberId = req.member?._id ?? null;
		const result = await productService.getProduct(memberId, id as string);

		res.status(HttpCode.OK).json(result);
	} catch (err) {
		console.log("Error getProduct, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};


export default productController;
