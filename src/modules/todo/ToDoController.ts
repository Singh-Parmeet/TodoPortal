/* eslint-disable consistent-return */
// import * as cron from 'node-cron';
// import * as archiver from 'archiver';
// import * as fs from 'fs';
// import { pipeline } from 'stream';
import { SystemResponse } from '../../libs/response-handler';
import IToDo from './IToDo';
import { Nullable } from '../../libs/nullable';
import ToDoService from './ToDoService';

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
        const todoService = new ToDoService();

        try {
            const result = await todoService.create(
                req.body,
            );
            return res.send(
                SystemResponse.success('Record Added Succefully', result),
            );
        } catch (err) {
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public get = async (req, res): Promise<Nullable<IToDo>> => {
        const { services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.params;
            const result = await moduleService.get({
                id,
            });
            return res.send(SystemResponse.success('ToDo record Found..!', result));
        } catch (err) {
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public update = async (req, res) => {
        const { services } = res;
        const { moduleService } = services;
        try {
            const data = req.body;
            const result = await moduleService.update(data.id, data);
            return res.send(
                SystemResponse.success('Record updated successfully', result),
            );
        } catch (err) {
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public delete = async (req, res) => {
        const { services } = res;
        const { moduleService } = services;
        try {
            const { id } = req.param;
            const result = await moduleService.delete({
                id,
            });
            return res.send(SystemResponse.success('Record deleted', result));
        } catch (err) {
            return res.send(SystemResponse.internalServerError);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    // public async cron(req, res) {
    //     const todoService = new ToDoService();
    //     try {
    //         console.log('Job Cron :: Start');
    //         cron.schedule('* * * * *', async () => {
    //             const updatedList = await todoService.list(0, 0);
    //             console.log('List----->', updatedList);
    //             return res.send(SystemResponse.success('UPdated list', updatedList));
    //         });
    //     } catch (err) {
    //         return res.send(SystemResponse.internalServerError, err);
    //     }
    // }

    // eslint-disable-next-line class-methods-use-this
    // public async streams(req, res) {
    //     const todoService = new ToDoService();
    //     try {
    //         const list = await todoService.list(0, 0);
    //         fs.writeFileSync('todoList/output.txt', JSON.stringify(list));

    //         const writeableStream = fs.createWriteStream('todoList/list.zip');
    //         const archive = archiver('zip');

    //         archive.file('todoList/output.txt', { name: 'output.txt' });

    //         archive.finalize();

    //         archive.pipe(writeableStream);
    //         console.log('Closed');
    //         return res.send(SystemResponse.success('List zip file downloaded', writeableStream));
    //     } catch (err) {
    //         return res.send(SystemResponse.internalServerError, err);
    //     }
    // }
}

export default ToDoController.getInstance();
