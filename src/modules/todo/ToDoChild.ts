import ToDoService from './ToDoService';
import { SystemResponse } from '../../libs/response-handler';

process.on('message', (data) => {
    const todoService = new ToDoService();
    console.log('req---->', data);
    const values = data;
    const result = todoService.create(values);
    process.send(SystemResponse.success('Record Added Succefully', result));
});
