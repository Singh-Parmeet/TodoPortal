import { Schema } from 'mongoose';
import BaseSchema from '../../../libs/BaseRepo/BaseSchema';

export default class ToDoSchema extends BaseSchema {
    constructor(options: any) {
        const baseSchema = {
            title: {
                type: String,
            },
            description: Schema.Types.Mixed,
            status: {
                type: String,
                default: 'To Do',
            },
        };
        super(baseSchema, options);
    }
}
