import UserService from "./UserService";
import PasswordReset from "../model/PasswordReset";
import {PasswordResetModel, UserModel} from "../model";
import {date} from "zod";
import {DATE} from "sequelize";
import jwt from "jsonwebtoken";
import MailSender from "./EmailSenderService";
import {forgotPasswordEmail} from "../EmailTemplate/mailTemplate";
import {response} from "express";



export interface IForgotPassword {
    email: string,
    token: string;
}


class ChangePasswordService{

    static async findByCriteria(criteria: any){
          return await PasswordResetModel.findAll({where: criteria});
    }

    static async forgotPassword(email: string ) {
        try {
            const emailChecked = await UserModel.findAll({where: {email: email}});
            if (emailChecked.length < 1) {
                console.log("Email does not exist");
                return "Account does not exist";
            }
            //generate token and save in DTB
            const token = jwt.sign({email: email, id: emailChecked[0].id}, process.env.JWT_SALT as string,
                {expiresIn: '15m'});
            const updatePasswordResetTable = await PasswordResetModel.findOrCreate({
                where: {
                    email: email,
                    token: token
                }
            }); //this is storing the created token in the dtb

            //A password reset Link is sent by email
            const emailSender = new MailSender();
            await emailSender.mailSend({
                to: "seundeem@gmail.com",
                bcc: "null",
                cc: [],
                subject: "Password Reset",
                message: forgotPasswordEmail("http://localhost:3000/ResetPassword/" + token)
            });
            // return "Mail sent successfully";

        } catch (err){
            return response.status(500).json({
                message: "Invalid Email address " + err
            });
        }
    }

    static async updatePassword(criteria: any){

    }
}
export default ChangePasswordService;