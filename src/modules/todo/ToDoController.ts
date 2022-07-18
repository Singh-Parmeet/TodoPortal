import { SystemResponse } from '../../libs/response-handler';
import IToDo from './IToDo';
import { Nullable } from '../../libs/nullable';

class ToDoController {
    private static instance;

    public static getInstance() {
        if (!ToDoController.instance) {
            ToDoController.instance = new ToDoController();
        }

        return ToDoController.instance;
    }

    // eslint-disable-next-line class-methods-use-this
    public list = async (req, res): Promise<IToDo[]> => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { limit, skip } = req.query;
            const result = await moduleService.list(
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

    // eslint-disable-next-line class-methods-use-this
    public create = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const result = await moduleService.create(
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

    // eslint-disable-next-line class-methods-use-this
    public get = async (req, res): Promise<Nullable<IToDo>> => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const result = await moduleService.get({
                id,
            });
            logger.info({ messgae: 'ToDo record found', data: [] });
            return res.send(SystemResponse.success('ToDo record Found..!', result));
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public update = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const data = req.body;
            const result = await moduleService.update(data.id, data);
            logger.info({ messgae: 'Record updated', data: [] });
            return res.send(
                SystemResponse.success('Record updated successfully', result),
            );
        } catch (err) {
            logger.error({ message: err.message, option: [{ Error: err.stack }] });
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public delete = async (req, res) => {
        const { locals: { logger }, services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.param;
            const result = await moduleService.delete({
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
