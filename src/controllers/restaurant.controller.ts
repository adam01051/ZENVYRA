
import { T } from "../libs/types/common";
import { Response, Request, NextFunction } from "express";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enum/member.enum";

import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService = new MemberService();
const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
	try {
		console.log("Home Page");
		res.render("home");
	} catch (err) {
		console.log("error in goHome", err);
		res.redirect("/admin");
	}
};
restaurantController.getLogin = (req: Request, res: Response) => {
	try {
		console.log("get login  Page");
		res.render("login");
	} catch (err) {
		console.log("error in Login", err);
		res.redirect("/admin");
	}
};

restaurantController.getSignup = (req: Request, res: Response) => {
	try {
		console.log("signup Page");
		res.render("signup");
	} catch (err) {
		console.log("error in signup", err);
		res.redirect("/admin");
	}
};

restaurantController.processSignup = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("signup Page");
		const file = req.file;

		if (!file)
			throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

		const newMember: MemberInput = req.body;
		newMember.memberImage = file?.path.replace(/\\/g, "/");
		newMember.memberType = MemberType.RESTAURANT;
		const result = await memberService.processSignup(newMember);

		req.session.member = result;
		req.session.save(function () {
			res.redirect("/admin/product/all");
		});
	} catch (err) {
		console.log("error in processSignup", err);
		const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

		res.send(
			`<script> alert("${message}"); window.location.replace('admin/login')</script>`,
		);
	}
};
restaurantController.processLogin = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("proccess login");
		console.log("body", req.body);

		const input: LoginInput = req.body;

		const result = await memberService.processLogin(input);

		req.session.member = result;
		req.session.save(function () {
			res.redirect("/admin/product/all");
		});
	} catch (err) {
		console.log("error in processLogin", err);
		const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

		res.send(
			`<script> alert("${message}); window.location.replace('admin/login')</script>`
		);
	}
};

restaurantController.checkAuthSession = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("check auth session");
		if (req.session?.member) {
			res.send(`<script> alert( "${req.session.member.memberNick}")</script>`);
		} else {
			res.send(`<script> alert( "${Message.NOT_AUTHENTICATED}")</script>`);
		}
	} catch (err) {
		console.log("error in checkAuthSession", err);
		res.send(err);
	}
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
	try {
		console.log(" logout");
		req.session.destroy(function () {
			res.redirect("/admin");
		});
	} catch (err) {
		console.log("error in log out", err);
		res.redirect("/admin");
	}
};

restaurantController.getUsers = async (req: Request, res: Response) => {
	try {
		console.log(" getUsers  ");
		
		const result = await memberService.getUsers();
		console.log(result);
		res.render("users", { users: result });

	} catch (err) {
		console.log("error in getUsers", err);
		res.redirect("/admin/login");
	}
};


restaurantController.updateChosenUser =  async (req: Request, res: Response) => {
	try {
		console.log("updateCHosenUser");
		const result = await memberService.updateChosenUser(req.body);
		
		res.status(HttpCode.OK).json({data:result})

	} catch (err) {
		console.log("error in updateCHosenUser", err);
	
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);





	}

};






restaurantController.verifyRestaurant = (
	req: AdminRequest,
	res: Response,
	next: NextFunction
) => {
	if (req.session?.member?.memberType === MemberType.RESTAURANT) {
		req.member = req.session.member;
		next();
	} else {
		res.send(
			`<script> alert( "${Message.NOT_AUTHENTICATED}"); window.location.replace("/admin/login") </script>`
		);
	}
};





export default restaurantController;