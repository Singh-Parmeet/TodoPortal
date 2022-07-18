import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { SystemResponse } from '../../libs/response-handler';
import config from '../../config/configuration';
import { NotificationService } from '../../config/constants';
import UserRepository from '../user/repository/UserRepository';
import { Services } from '../../services/constants';

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

    public static mailMatch = async (data : any, logger) => {
        const userRepository: UserRepository = new UserRepository();
        const validateEmail = await userRepository.findOne({ email: data.email });
        if (validateEmail) {
            return validateEmail;
        }
        logger.debug('Invalid Email');
        throw new Error('Invalid Email');
    };

    public static forgotPassword = async (req, res) => {
        const { logger } = res.locals;
        try {
            const emailValidated = await UserLogin.mailMatch(req.body, logger);
            logger.info({ message: 'Link sent Successfully' });
            if (emailValidated) {
                // third party services check
                const { services } = res;
                const notificationService = services.get(Services.NOTIFICATION_SERVICE);
                const response = await notificationService.initializedService
                    .get(NotificationService.templateId.forgotPassword);

                if (response.isAxiosError === true) {
                    return await res.send(
                        SystemResponse.badRequestError(
                            'Notification Service Unavailable',
                            `${response.response ? response.response.data.error : response.response}, ${response.response ? response.response.data.message : response.response}`,
                        ),
                    );
                }
            }
            return res.send(SystemResponse.success('Success', {
                message: 'Email generated Successfully',
                data: {
                    emailValidated,
                },
                status: 'success',
            }));
        } catch (err) {
            return res.send(SystemResponse.badRequestError('Failed', err.message));
        }
    };
}
export default UserLogin;
