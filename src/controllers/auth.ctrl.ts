import { Request, Response } from 'express';
import { HttpStatusCode } from '../const/statusCode';
import { generateToken, serviceResponse } from "../libs";
import { getUser } from "../queries";

class AuthController {
  public async signin(req: Request, res: Response) {

    const { username } = req.body;

    const user = await getUser({ username });
    
    if(!user) return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: "something went wrong.", error: "" }));

    const { id, email } = user.sh_users.at(0);

    const token = generateToken({ id, username, email });

    return res.status(HttpStatusCode.OK).json(serviceResponse({ data: token, success: true, message: "user logged successfully", error: null }));
  }
}

export const authCtrl = new AuthController();