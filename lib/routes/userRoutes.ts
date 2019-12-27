import {Request, Response, NextFunction} from "express";
import { UserController } from "../controller/userController";

export class UserRoutes { 

    public userController: UserController = new UserController() 
        
    public routes(app): void {   
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Server is running'
            })
        })

        //users
        app.route('/user')
        .get(this.userController.getUsers)        

        // POST endpoint
        .post(this.userController.addUser)

        // user detail
        app.route('/user/:userId')
        // get specific user
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)

    }
}