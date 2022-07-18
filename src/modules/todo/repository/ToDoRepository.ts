import * as mongoose from 'mongoose';
import { Nullable } from '../../../libs/nullable';
import BaseRepository from '../../../libs/BaseRepo/BaseRepository';
import {
    IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate,
} from '../entities';
import IToDoModel from './IToDoModel';
import { todoModel } from './ToDoModel';

class ToDoRepository extends BaseRepository<IToDoModel,
  mongoose.Model<IToDoModel>> {
    constructor() {
        super(todoModel);
    }

    public async list(options: IQueryList, projection?): Promise<IToDoModel[]> {
        return super.list({}, projection, options);
    }

    public async create(options: IQueryCreate): Promise<IToDoModel> {
        return super.create(options);
    }

    public async get(query: IQueryGet): Promise<Nullable<IToDoModel>> {
        return super.findOne(query);
    }

    public async count(query): Promise<number> {
        return super.count(query);
    }

    public async findOne(query): Promise<IToDoModel> {
        return super.findOne(query);
    }

    public async update(options, itemsToUpdate: IQueryUpdate): Promise<IToDoModel> {
        return super.update(options, itemsToUpdate);
    }

    public async delete(query: IQueryDelete): Promise<mongoose.UpdateQuery<IToDoModel>> {
        return super.delete({ id: query.id });
    }
}
export default ToDoRepository;
