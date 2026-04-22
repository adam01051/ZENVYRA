import { T } from "../libs/types/common";
import { Response, Request, NextFunction } from "express";
import MemberService from "../models/Member.service";
import {
	MemberInput,
	LoginInput,
	Member,
	ExtendedRequest,
	MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";
import { verify } from "../../node_modules/@types/jsonwebtoken/index.d";



const memberService = new MemberService();
const memberController: T = {};
//react
const authSevice = new AuthService();


memberController.getRestaurant = async (req: Request, res: Response) => {
	
try {
	console.log("getRestaurant");
	const result = await memberService.getRestaurant();
 
	res.status(HttpCode.OK).json(result);
} catch (err) {
	console.log("Error in getRestaurant, jarayoni", err);
	if (err instanceof Errors) {
		res.status(err.code).json(err);
	} else {
		res.status(Errors.standard.code).json(Errors.standard);
	}
}

}





memberController.signup = async (req: Request, res: Response) => {
	try {
		console.log("signup");

		const input: MemberInput = req.body,
			result: Member = await memberService.signup(input);
		const token = await authSevice.createToken(result);
		res.cookie("accessToken", token, {
			maxAge: AUTH_TIMER * 3600 * 1000,
			httpOnly: false,
		});

		res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
	} catch (err) {
		console.log("Error signup, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};

memberController.login = async (req: Request, res: Response) => {
	try {
		const input: LoginInput = req.body;
		const result = await memberService.login(input);
		const token = await authSevice.createToken(result);

		res.cookie("accessToken", token, {
			maxAge: AUTH_TIMER * 3600 * 1000,
			httpOnly: false,
		});

		res.status(HttpCode.OK).json({ member: result, accessToken: token });
	} catch (err) {
		console.log("Error login, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};



memberController.logout = async (req: ExtendedRequest, res: Response) => {
	try {
		console.log("logiut");
		res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });

		res.status(HttpCode.OK).json({ logout: true });
	} catch (err) {
		console.log("Error logout, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};

memberController.getMemberDetail = async (
	req: ExtendedRequest,
	res: Response,
) => {
	try {
		console.log("getmember detail section");

		const result = await memberService.getMemberDetail(req.member);

		res.status(HttpCode.OK).json(result);
	} catch (err) {
		console.log("Error getMemberDetail, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
	try {
		console.log("updateMember  section");
		const input: MemberUpdateInput = req.body;
		if (req.file) input.memberImage = req.file.path.replace(/\\/, "/");
		const result = await memberService.updateMember(req.member, input);

		res.status(HttpCode.OK).json(result);
	} catch (err) {
		console.log("Error updateMember, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};
memberController.getTopUsers = async (req: Request, res: Response) => {
	try {
			console.log("getTopUsers  section");
		const result = await memberService.getTopUsers();


		res.status(HttpCode.OK).json(result);

	} catch (err) {
		console.log("Error getTopUsers, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};






memberController.verifyAuth = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies["accessToken"];
		if (token) {
			req.member = await authSevice.checkAuth(token);
		}
		if (!req.member)
			throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

		next();
	} catch (err) {
		console.log("Error verifyAuth, jarayoni", err);
		if (err instanceof Errors) {
			res.status(err.code).json(err);
		} else {
			res.status(Errors.standard.code).json(Errors.standard);
		}
	}
};

memberController.retrieveAuth = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies["accessToken"];
		if (token) {
			req.member = await authSevice.checkAuth(token);
		}

		next();
	} catch (err) {
		console.log("Error retrieveAuth, jarayoni", err);
		next();
	}
};




export default memberController;
