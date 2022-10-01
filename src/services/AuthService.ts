import jwt from 'jsonwebtoken';
import 'dotenv/config';


class AuthService{

    static async generateToken(params: object) {
        return jwt.sign(params, process.env.JWT_SALT as string, {expiresIn: '1hr'});
    }

}
export default AuthService;