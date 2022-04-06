import * as jwt from 'jsonwebtoken';
import { SystemResponse } from 'response-handler';
import * as bcrypt from 'bcrypt';
import config from '../../config/configuration';
import UserRepository from '../user/repository/UserRepository';

class UserLogin {
    public static hashMatch = async (data : any, logger) => {
        const userRepository: UserRepository = new UserRepository();
        const validateEmail = await userRepository.findOne({ email: data.email });
        const match = await bcrypt.compare(data.password, validateEmail.password);
        if (match) {
            return validateEmail;
        }
        logger.debug('Invalid Credential');
        throw new Error('Invalid Credential');
    };

    public static login = async (req, res) => {
        const { logger } = res.locals;
        try {
            const validateEmail = await UserLogin.hashMatch(req.body, logger);
            const token = jwt.sign({ data: validateEmail.email }, config.secret, { expiresIn: '1hr' });
            logger.info({ message: 'Token generated Successfully' });
            return res.send(SystemResponse.success('Success', {
                message: 'Token generated Successfully',
                data: {
                    token,
                },
                status: 'success',
            }));
        } catch (e) {
            return res.send(SystemResponse.badRequestError('Invalid Credential', e));
        }
    };
}
export default UserLogin;
