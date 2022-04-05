import { SystemResponse } from 'response-handler';
import IToDo from './IToDo';
import { Nullable } from '../../libs/nullable';
import ToDoService from './ToDoService';

class ToDoController {
    private static instance;

    private todoService: ToDoService;

    private constructor() {
        this.todoService = new ToDoService();
    }

    public static getInstance() {
        if (!ToDoController.instance) {
            ToDoController.instance = new ToDoController();
        }

        return ToDoController.instance;
    }

    /**
   * @property {number} skip - Number of records to be skipped.
   * @property {number} limit - Limit number of records to be returned.
   * @returns {IToDo[]}
   */
    public list = async (req, res): Promise<IToDo[]> => {
        const { logger } = res.locals;
        try {
            const { limit, skip } = req.query;
            const result = await this.todoService.list(
                limit,
                skip,
            );
            if (!result.length) {
                logger.debug({ message: 'Data not found', option: [], data: [] });
                return res.send(SystemResponse.badRequestError('Data not found', ''));
            }
            logger.info({ message: 'List of ToDo', data: [], option: [] });
            return res.send(SystemResponse.success('List of ToDo ', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * @property {string} title - Title.
   * @property {string} description - The description.
   * @returns {IToDo}
   */
    public create = async (req, res) => {
        const { logger } = res.locals;
        try {
            const result = await this.todoService.create(
                req.body,
            );
            logger.info({ messgae: 'Record Added Successfully', data: [], option: [] });
            return res.send(
                SystemResponse.success('Record Added Succefully', result),
            );
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * @property {string} id - The id of record.
   * @returns {IToDo}
   */
    public get = async (req, res): Promise<Nullable<IToDo>> => {
        const { logger } = res.locals;
        try {
            const { id } = req.params;
            const result = await this.todoService.get({
                id,
            });
            logger.info({ messgae: 'ToDo record found', data: [] });
            return res.send(SystemResponse.success('ToDo record Found..!', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * @param {string} id - The id of the record.
   * @param {string} title - The updated title of record.
   * @param {string} description - The updated description of record.
   * @param {string} status - The updated status of record.

   * @returns {IToDo}
   */
    public update = async (req, res) => {
        const { logger } = res.locals;
        try {
            const { id, ...rest } = req.body;
            const result = await this.todoService.update({
                ...rest,
                id,
            });
            logger.info({ messgae: 'Record updated', data: [] });
            return res.send(
                SystemResponse.success('Record updated successfully', result),
            );
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    /**
   * @param {string} id - The id of the record.
   */
    public delete = async (req, res) => {
        const { logger } = res.locals;
        try {
            const { id } = req.body;
            const result = await this.todoService.delete({
                id,
            });
            logger.info({ messgae: 'Record deleted', data: [], option: [] });
            return res.send(SystemResponse.success('Record deleted', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };
}

export default ToDoController.getInstance();
