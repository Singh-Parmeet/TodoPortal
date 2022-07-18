import BaseSchema from '../../../libs/BaseRepo/BaseSchema';

export default class ToDoSchema extends BaseSchema {
    constructor(options: any) {
        const baseSchema = {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            status: {
                type: String,
                default: 'To Do',
            },
        };
        super(baseSchema, options);
    }
}
