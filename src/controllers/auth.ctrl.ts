import { Request, Response } from 'express';
import { HttpStatusCode } from '../const/statusCode';
import { generateToken, serviceResponse, validatePassword } from "../libs";
import { getUser } from "../queries";

class AuthController {
	public async signin(req: Request, res: Response) {

		const usernameQL = req.body?.username;
		const emailQL = req.body?.email;

		const queryCondition = usernameQL ? { value: usernameQL, column: 'username' } : { value: emailQL, column: 'email' };

		const { data, message } = await getUser(queryCondition);

		if (data?.sh_users === null || data == undefined)
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't get user.", error: `${message}` }));

		if (data?.sh_users.length === 0)
			return res.status(HttpStatusCode.UNAUTHORIZED).json(serviceResponse({ data: null, success: true, message: "Invalid credentials.", error: "" }));

		const { id, email, username, password, created_with_sn, user_category } = data.sh_users.at(0);

		const isCorrectPass = await validatePassword(req.body.password, password);

		if (!isCorrectPass)
			return res.status(HttpStatusCode.UNAUTHORIZED).json(serviceResponse({ data: null, success: true, message: "Invalid credentials.", error: "" }));

		const token = generateToken({ id, username, email, created_with_sn, user_category });

		return res.status(HttpStatusCode.OK).json(serviceResponse({ data: token, success: true, message: "user logged successfully", error: null }));
	}

	public async socialsignin(req: Request, res: Response) {

		const usernameQL = req.body?.username;
		const emailQL = req.body?.email;

		const queryCondition = usernameQL ? { value: usernameQL, column: 'username' } : { value: emailQL, column: 'email' };

		const { data, message } = await getUser(queryCondition);

		if (data?.sh_users === null || data == undefined)
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serviceResponse({ data: null, success: false, message: "Couldn't get user.", error: `${message}` }));

		if (data?.sh_users.length === 0)
			return res.status(HttpStatusCode.UNAUTHORIZED).json(serviceResponse({ data: null, success: true, message: "Invalid credentials.", error: "" }));

		const { id, email, username, created_with_sn, user_category } = data?.sh_users.at(0);

		const token = generateToken({ id, username, email, created_with_sn, user_category });

		return res.status(HttpStatusCode.OK).json(serviceResponse({ data: token, success: true, message: "user logged successfully", error: null }));
	}
}

export const authCtrl = new AuthController();
