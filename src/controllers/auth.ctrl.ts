import { Request, Response } from 'express';
import { HttpStatusCode } from '../const/statusCode';
import { generateToken, serviceResponse, validatePassword } from "../libs";
import { getUser } from "../queries";

class AuthController {
  public async signin(req: Request, res: Response) {

    const usernameQL = req.body?.username;
    const emailQL = req.body?.email;

    const queryCondition = usernameQL ? { value: usernameQL, column: 'username' } : { value: emailQL, column: 'email' };

    const user = await getUser(queryCondition);

    if (user.sh_users.length === 0) return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: true, message: "Invalid credentials.", error: "" }));

    const { id, email, username, password, user_category } = user.sh_users.at(0);

    const isCorrectPass = await validatePassword(req.body.password, password);

    if (!isCorrectPass) return res.status(HttpStatusCode.FORBIDDEN).json(serviceResponse({ data: null, success: true, message: "Invalid credentials.", error: "" }));
    
    const token = generateToken({ id, username, email, user_category });

    return res.status(HttpStatusCode.OK).json(serviceResponse({ data: token, success: true, message: "user logged successfully", error: null }));
  }
}

export const authCtrl = new AuthController();