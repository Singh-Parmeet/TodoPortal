/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';

import IToDoModel from './IToDoModel';
import ToDoSchema from './ToDoSchema';

export const todoSchema = new ToDoSchema({
    collection: 'Task-Management',
    toJSON: {
        transform: (doc, ret) => {
            const res = ret;
            res.id = res._id;
            delete res._id;
            delete res.__v;
        },
        virtuals: true,
    },
});

export const todoModel: mongoose.Model<IToDoModel> = mongoose.model<IToDoModel>(
    'Task-Management',
    todoSchema,
);
