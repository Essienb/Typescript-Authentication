import {Response, Request} from "express";
import ChangePasswordService from "../services/ChangePasswordService";
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserService from "../services/UserService";
import bcrypt from "bcrypt";



class PasswordController{

    static async forgotPassword(req: Request, res:Response) {

        try{
            const emailProvided = req.body.email;

            const resetPasswordLink = await ChangePasswordService.forgotPassword(emailProvided);
            if(emailProvided === resetPasswordLink){
                return "Invalid Email address for forgot password";
            }
            return res.status(200).json({
                message: "Mail sent successfully!"
            });

        } catch(err){
            console.log(err);
            return res.status(500).json({
                message: "update password failed!"
            })
        }
    }

    static async resetPassword(req: Request, res: Response){
        try{
            const token = req.body.token;
            const secret = (process.env.JWT_SALT as string);

            const newPassword = req.body.newPassword;
            const confirmNewPassword = req.body.confirmNewPassword;
            if(confirmNewPassword != newPassword){
                return "password not valid";
            }

            jwt.verify(token, secret, async(error: any, payloadType: any)=> {
                if (error) {
                    res.status(403).json({
                        message: "accessToken isNotValid , so stay out! "
                    });
                    return;
                }
                //hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                //set new Password
                await UserService.update(payloadType.id, {password: hashedPassword})
            });

            return res.status(200).json({
                message: "Password reset was successful! "
            });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                message: err
            })
        }
    }

}
export default PasswordController;