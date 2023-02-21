import { Schema } from 'mongoose';
import BaseSchema from '../../../libs/BaseRepo/BaseSchema';

export default class UserSchema extends BaseSchema {
    constructor(options: any) {
        const List = new Schema({
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            status: {
                type: String,
            },
        });
        const baseSchema = {
            first_name: {
                type: String,
            },
            last_name: {
                type: String,
            },
            email: {
                type: String,
            },
            password: {
                type: String,
            },
            todoList: [List],
        };
        super(baseSchema, options);
    }
}
