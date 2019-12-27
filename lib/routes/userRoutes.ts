import {Request, Response, NextFunction} from "express";
import { UserController } from "../controller/userController";

export class UserRoutes { 

    public userController: UserController = new UserController() 
        
    public routes(app): void {   
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
    }
}