import * as mongoose from 'mongoose';
import { Nullable } from '../../../libs/nullable';
import VersioningRepository from '../../../libs/versionable/VersioningRepository';
import {
    IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate,
} from '../entities';
import IToDoModel from './IToDoModel';
import { todoModel } from './ToDoModel';

class ToDoRepository extends VersioningRepository<IToDoModel,
  mongoose.Model<IToDoModel>> {
    constructor() {
        super(todoModel);
    }

    /**
   * Get ToDo list.
   * @property {number} skip - Number of records to be skipped.
   * @property {number} limit - Limit number of records to be returned.
   * @returns {User[]}
   */
    public async list(options: IQueryList): Promise<IToDoModel[]> {
        return super.getAll({}, options);
    }

    /**
   * Create ToDo record.
   * @property {string} title - Title of record.
   * @property {string} description - Description.
   * @returns {User}
   */
    public async create(options: IQueryCreate): Promise<IToDoModel> {
        return super.create(options);
    }

    /**
   * Get record.
   * @property {string} id - The _id of the record.
   * @returns {record}
   */
    public async get(query: IQueryGet): Promise<Nullable<IToDoModel>> {
        return super.getById(query.id);
    }
    /**
   * Count list.
   * @property - Total number of records.
   * @returns -Total number of records.
   */

    public async count(): Promise<number> {
        return super.count();
    }

    public async findOne(query): Promise<IToDoModel> {
        return super.findOne(query);
    }

    /**
   * Update new record
   * @property {string} title - The title of record.
   * @property {string} description - The title of record.
   * @property {string} status - The title of record.
   * @returns {record}
   */
    public async update(options: IQueryUpdate): Promise<IToDoModel> {
        return super.update(options);
    }

    /**
  *
  * @param query
  * @returns
  */
    public async delete(query: IQueryDelete): Promise<IToDoModel> {
        return super.remove(query.id);
    }
}
export default ToDoRepository;
