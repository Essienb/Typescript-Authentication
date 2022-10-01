import nodemailer from "nodemailer";
import "dotenv/config";


interface iEmailConfig{
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    }


}

interface iEmailObject{
    to: string,
    bcc: string,
    cc: [],
    subject: string,
    message: any
    }



class MailSender{

    //Email config
    emailConfig: iEmailConfig = {
        host: (process.env.EMAIL_HOST as string),
        port: 2525,
        secure:false,
        auth: {user: process.env.EMAIL_USER as string, pass:process.env.EMAIL_PASSWORD as string}

    }

    async mailSend(mailObject: iEmailObject){
        //for sending Emails
        const sender = nodemailer.createTransport(this.emailConfig)


        // send mail with defined transport object
        const mailSent = await sender.sendMail({
            from:(process.env.EMAIL_FROM as string),
            // from:"no_reply@basi.com",
            to:mailObject.to,
            bcc:mailObject.bcc,
            cc:mailObject.cc,
            subject:mailObject.subject,
            html:mailObject.message
        })
        console.log("response: " + mailSent);
    }

}

export default MailSender;





