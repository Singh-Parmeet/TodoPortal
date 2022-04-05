import { SystemResponse } from 'response-handler';
import * as bcrypt from 'bcrypt';
import IUser from './IUser';
import { Nullable } from '../../libs/nullable';
import UserService from './UserService';
import CacheManager from '../../libs/cache/CacheManager';
import patternMatecherhelper from './helper/PatternMatecherHelper';
import * as constants from '../../config/constants';

class UserController {
    private constructor() {
        this.userService = new UserService();
    }

    private static instance;

    private userService: UserService;

    public static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }

        return UserController.instance;
    }

    /**
   * Get user list.
   * @property {number} skip - Number of messages to be skipped.
   * @property {number} limit - Limit number of messages to be returned.
   * @returns {IUser[]}
   */
    public list = async (req, res, next): Promise<IUser[]> => {
        const { logger } = res.locals;
        try {
            const { limit, skip } = req.query;
            const result = await this.userService.list(limit, skip);
            if (!result.length) {
                logger.debug({ message: 'Data not found', option: [], data: [] });

                return next(SystemResponse.badRequestError('Data not found', ''));
            }
            logger.info({ message: 'List of Users', data: [], option: [] });
            return res.send(SystemResponse.success('List of Users ', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * Create new user
   * @property {string} first_name - The first_name of user.
   * @property {string} last_name - The last_name of user.
   * @returns {IUser}
   */
    public create = async (req, res) => {
        const { logger } = res.locals;
        try {
            const result = await this.userService.create(req.body);
            logger.info({ messgae: 'User Created Successfully', data: [], option: [] });
            return res.send(SystemResponse.success('User created', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * Get user.
   * @property {string} id - The id of user.
   * @returns {IUser}
   */
    public get = async (req, res): Promise<Nullable<IUser>> => {
        const { logger } = res.locals;
        try {
            const { id } = req.params;
            const result = await this.userService.get({ id });
            logger.info({ messgae: 'User found', data: [] });
            return res.send(SystemResponse.success('User found', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * Update the user
   * @param {string} id - The id of the user.
   * @param {string} name - The updated name of user.
   * @returns {IUser}
   */
    public update = async (req, res) => {
        const { logger } = res.locals;
        try {
            const { id, ...rest } = req.body;
            const result = await this.userService.update({
                ...rest,
                id,
            });
            logger.info({ messgae: 'User updated', data: [] });
            return res.send(SystemResponse.success('User updated successfully', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * Delete the user
   * @param {string} id - The id of the user.
   */
    public delete = async (req, res) => {
        const { logger } = res.locals;
        try {
            const { id } = req.body;
            const result = await this.userService.delete({
                id,
            });
            logger.info({ messgae: 'User deleted', data: [], option: [] });
            return res.send(SystemResponse.success('User deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public async SetRedisValue(req, res) {
        const result = {
            value: req.body.value,
            key: req.body.key,
        };
        CacheManager.setEx(result.key, 3600, JSON.stringify(result.value), '');
        return res.send(SystemResponse.success('Redis Value set', result.value));
    }

    // eslint-disable-next-line class-methods-use-this
    public async GetRedisValue(req, res) {
        const { key } = req.body;
        const getResponse = await CacheManager.get(key, '');
        res.send(SystemResponse.success('Redis Value get', patternMatecherhelper(getResponse)));
    }

    public registration = async (req, res, next) => {
        const { logger } = res.locals;
        try {
            const { email, password } = req.body;
            bcrypt.genSalt(constants.BCRYPT_SALT_ROUNDS, (_err, salt) => {
                bcrypt.hash(password, salt, async (err: any, hash) => {
                    const result = await this.userService.create(
                        { email, password: hash },
                    );
                    logger.info({ messgae: 'User registered', data: [], option: [] });
                    return res.send(SystemResponse.success('User register successfully', result));
                });
            });
            return 'Registration Completed';
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return next(err);
        }
    };
}

export default UserController.getInstance();
