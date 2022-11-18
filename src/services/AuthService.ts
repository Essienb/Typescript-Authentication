import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {RefreshTokenModel} from "../model";


class AuthService{

    static generateToken(params: object) {
        return jwt.sign(params, process.env.JWT_SALT as string,
            {expiresIn: '1hr'});
        // console.log("check generatedToken", generatedToken);
        // return generatedToken;
    }

    static async generateRefreshToken(token: any ){

        const secret = (process.env.JWT_REFRESHTOKEN_SECRET as string);
        const refreshToken = jwt.sign(token, secret, {expiresIn: 24*60*60*1000});
        await RefreshTokenModel.create({
           token: refreshToken,
           userId: token.id
        });
        return refreshToken;
    }

    static async  generateAccessToken(refreshToken:any){
        const secret = (process.env.JWT_REFRESHTOKEN_SECRET as string);
        if(refreshToken == null) throw "refresh token is required";
        const checkIfRefreshTokenExist = await RefreshTokenModel.findAll(
            {where: {token: refreshToken}});
        if(checkIfRefreshTokenExist.length < 1) throw "invalid refresh token";
        //console.log(checkIfRefreshTokenExist);
        return {
            token: jwt.verify(refreshToken, secret, (error: any, user:any) => {
                if(error) throw error;
                delete user.iat;   //issued at date
                delete user.exp;   //expired at date
                return this.generateToken(user);
            }),
            userId: checkIfRefreshTokenExist[0].userId


        }
    }

    static async removeRefreshTokenFromDb(token: any){
        const refreshToken = await RefreshTokenModel.findOne({where: {token: token}});
        return await refreshToken?.destroy();
    }

}
export default AuthService;