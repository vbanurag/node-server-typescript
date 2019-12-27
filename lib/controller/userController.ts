import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController{

    public addUser (req: Request, res: Response) {                
        let newUser = new User(req.body);
    
        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }    
            res.json(user);
        });
    }

    public updateUser (req: Request, res: Response) {     
        let { userId } = req.params;    
        if (userId) {
            User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
                if(err){
                    res.send(err);
                }
                res.json(user);
            });
        }  else {
            this.errorMessage(res);
        }
    } 

    public deleteUser (req: Request, res: Response) {  
        let { userId } = req.params; 
        if(userId) {
            User.remove({ _id: userId }, (err, user) => {
                if(err){
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted user!'});
            });
        } else {
            this.errorMessage(res);
        }
        
    }

    public getUsers (req: Request, res: Response) {
        let {max = 10, offset=0} = req.query;
        User.find({}).lean().skip(offset).limit(max).exec((err, users) => {
            if(err){
                res.send(err);
            }
            res.json(users);
          });
    }
 
    private errorMessage (res: Response) {
        return res.json({
            message: 'Invalid Request'
        });
    }
}