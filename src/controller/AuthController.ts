import {Request, Response} from 'express';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import bcrypt from "bcrypt";
import MailSender from "../services/EmailSenderService";
import {sampleEmail} from "../EmailTemplate/mailTemplate";


// interface IAuthController{
//     register(req:Request, res:Response): object,
//     userLogin(): object,

// }

class AuthController{

    //get the inputs
    //validate inputs
    //check if the email exist
    //if not in DTB, create the user and save

    static async register(req:Request, res:Response){
        //get the inputs
        //validate Inputs: Middleware
        //check if user exist: UserService
        //sign in immediately after registering
        try{

            const userCreated = await UserService.create(req.body);

            //generate a token for the created user
            const tokenGenerated = await AuthService.generateToken({id: userCreated.id, roleId: userCreated.roleId});

            return res.status(200).json({
                    message: "You have been hooked!",
                    data: userCreated,
                    token: tokenGenerated    
            });    
        }
        catch(err){
            return res.status(500).json({error: "Trust me when I say that " + err});
        }
            

    }

    static async userLogin(req: Request, res: Response){

        try{
            const {email, password} = req.body;
            const findUser = await UserService.findByCriteria({email: req.body.email});
            if(findUser.length < 0){
                return res.status(500).json({
                    message: "You are not welcomed!"
                });
            }
            //hash the password provided and compare with the one in DB
            const isAMatch = await bcrypt.compare(req.body.password, findUser[0].password );
            if(!isAMatch){
                return res.status(500).json({
                    message: "You gath the wrong Answer!"
                });
            }
            //generate a token for the created user
            const tokenGenerated = await AuthService.generateToken({id: findUser[0].id, roleId: findUser[0].roleId});

            const emailSender = new MailSender();
            await emailSender.mailSend({to: "seundeem@gmail.com",
                bcc: "null",
                cc: [],
                subject: "sample TypeScript script",
                message: sampleEmail(findUser[0].firstName)});

            return res.status(200).json({
                message: "You're good to hack it!",
                token: tokenGenerated
            });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                message: "An Error occured!"
            })
        }


    }


}

export default AuthController;

