import { Request, Response } from 'express';
import { HttpStatusCode } from '../const/statusCode';
import { generateToken, serviceResponse } from "../libs";
import { getUser } from "../queries";

class AuthController {
  public async signin(req: Request, res: Response) {

    const usernameQL = req.body?.username;
    const emailQL = req.body?.email;
    
    const query = usernameQL ? { value: usernameQL, column: 'username' } : { value: emailQL, column: 'email' };

    const user = await getUser(query);

    if (!user) return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: "something went wrong.", error: "" }));

    const { id, email, username } = user.sh_users.at(0);

    const token = generateToken({ id, username, email });

    return res.status(HttpStatusCode.OK).json(serviceResponse({ data: token, success: true, message: "user logged successfully", error: null }));
  }
}

export const authCtrl = new AuthController();