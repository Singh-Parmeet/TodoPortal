/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import * as cron from 'node-cron';
import * as archiver from 'archiver';
import * as fs from 'fs';
import { SystemResponse } from '../../libs/response-handler';
// import FormModel from './repository/FormModel';
import FormRepository from './repository/FormRepository';

class FormController {
    private static instance;

    public static getInstance() {
        if (!FormController.instance) {
            FormController.instance = new FormController();
        }

        return FormController.instance;
    }

    public list = async (req, res) => {
        const formRepository = new FormRepository();
        try {
            const { limit, skip } = req.query;
            console.log('limit and skip', limit, skip);
            const result = await formRepository.list(
                {},
                {},
                { limit, skip },
            );
            return res.send(SystemResponse.success('List of ToDo ', result));
        } catch (err) {
            return res.send(SystemResponse.internalServerError);
        }
    };

    public create = async (req, res) => {
        const formRepository = new FormRepository();
        try {
            const values = req.body;
            const result = formRepository.create1(values);
            return res.send(SystemResponse.success('Record Added Succefully', result));
        } catch (err) {
            return res.send(SystemResponse.internalServerError, err);
        }
    };

    public async cron(req, res) {
        const formRepository = new FormRepository();
        try {
            console.log('Job Cron :: Start');
            cron.schedule('* * * * *', async () => {
                const updatedList = await formRepository.list();
                console.log('List----->', updatedList);
                return res.send(SystemResponse.success('Updated list', updatedList));
            });
        } catch (err) {
            return res.send(SystemResponse.internalServerError, err);
        }
    }

    public async streams(req, res) {
        const formRepository = new FormRepository();
        try {
            const list = await formRepository.list();
            fs.writeFileSync('todoList/output.txt', JSON.stringify(list));

            const writeableStream = fs.createWriteStream('todoList/list.zip');
            const archive = archiver('zip');

            archive.file('todoList/output.txt', { name: 'output.txt' });

            archive.finalize();

            archive.pipe(writeableStream);
            console.log('Closed');
            return res.send(SystemResponse.success('Zip file downloaded', writeableStream));
        } catch (err) {
            return res.send(SystemResponse.internalServerError, err);
        }
    }
}

export default FormController.getInstance();
