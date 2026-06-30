import { HttpCode, Message } from "../libs/Errors";
import { Product, ProductInput, ProductInquiry } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { T } from "../libs/types/common";
import { ProductSize, ProductStatus } from "../libs/enum/product.enum";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enum/view.enum";

class ProductService {
	private readonly productModel;
	public viewService;

	constructor() {
		this.productModel = ProductModel;
		this.viewService = new ViewService();
	}

	public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
		const match: T = { productStatus: ProductStatus.PROCESS };
		if (inquiry.productCollection) {
			match.productCollection = inquiry.productCollection;
		}
		if (inquiry.search) {
			match.productName = { $regex: new RegExp(inquiry.search, "i") };
		}
		const sort: T =
			inquiry.order === "productPrice"
				? { [inquiry.order]: 1 }
				: { [inquiry.order]: -1 };
		const result = await this.productModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{ $skip: (inquiry.page * 1 - 1) * inquiry.limit },
				{ $limit: inquiry.limit * 1 },
			])
			.exec();

		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

		return result;
	}

	public async getProduct(
		memberId: ObjectId | null,
		id: string,
	): Promise<Product> {
		console.log("getProduct ");
		const productId = shapeIntoMongooseObjectId(id);

		let result = await this.productModel
			.findOne({ _id: productId, productStatus: ProductStatus.PROCESS })
			.exec();

		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

		if (memberId) {
			const input: ViewInput = {
				memberId: memberId,
				viewRefId: productId,
				viewGroup: ViewGroup.PRODUCT,
			};

			const existView = await this.viewService.checkViewExistence(input);

			console.log("evist", !!existView);
			if (!existView) {
				console.log("planning to insert new view");
				await this.viewService.insertMemberView(input);

				result = await this.productModel.findByIdAndUpdate(
					productId,
					{ $inc: { productViews: +1 } },
					{ new: true },
				);
			}
		}

		return result;
	}

	public async getAllproducts(): Promise<Product[]> {
		const result = await this.productModel.find().exec();

		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

		return result;
	}

	public async createNewProduct(input: ProductInput): Promise<Product> {
	try {
		const sizeStockMap = [
			{ size: ProductSize.S, stock: input.stockS },
			{ size: ProductSize.M, stock: input.stockM },
			{ size: ProductSize.L, stock: input.stockL },
			{ size: ProductSize.XL, stock: input.stockXL },
			{ size: ProductSize.XXL, stock: input.stockXXL },
		];

		const selectedSizes = Array.isArray(input.sizes)
			? input.sizes
			: [input.sizes];

		const variants = sizeStockMap
			.filter((item) => selectedSizes.includes(item.size))
			.map((item) => ({
				size: item.size,
				stock: Number(item.stock) || 0,
			}));

		const productData = {
			productStatus: input.productStatus,
			productCollection: input.productCollection,
			productName: input.productName,
			productPrice: input.productPrice,
			productDesc: input.productDesc,
			productImages: input.productImages || [],
			variants,
		};
		console.log("this is  prodcitdata from service");
		console.log(productData);
		
		return await this.productModel.create(productData);
	} catch (err) {
		console.log("error in model create new product");
		throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
	}
}

	public async updateChosenProduct(
		id: string,
		input: ProductInput,
	): Promise<Product> {
		id = shapeIntoMongooseObjectId(id);
		const result = await this.productModel
			.findOneAndUpdate({ _id: id }, input, { new: true })
			.exec();
		console.log(result);
		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.UPDATE_FAILED);

		return result;
	}
}
export default ProductService;
