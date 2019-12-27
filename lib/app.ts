import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { UserRoutes } from "./routes/userRoutes";

class App {

    public app: express.Application = express();
    public routePrv: UserRoutes = new UserRoutes();
    public mongoUrl: string = 'mongodb+srv://test:test@cluster0-a3hxj.mongodb.net/test?retryWrites=true&w=majority';  

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);     
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });        
    }

}

export default new App().app;