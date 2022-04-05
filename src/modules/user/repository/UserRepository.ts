import * as mongoose from 'mongoose';
import { Nullable } from '../../../libs/nullable';
import VersioningRepository from '../../../libs/versionable/VersioningRepository';
import {
    IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate,
} from '../entities';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';

class UserRepository extends VersioningRepository<IUserModel,
  mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }

    /**
   * Get user list.
   * @property {number} skip - Number of records to be skipped.
   * @property {number} limit - Limit number of records to be returned.
   * @returns {User[]}
   */
    public async list(options: IQueryList): Promise<IUserModel[]> {
        return super.getAll({}, options);
    }

    /**
   * Create new user
   * @property {string} first_name - The first name of user.
   * @property {string} last_name - The last name of user.
   * @returns {User}
   */
    public async create(options: IQueryCreate): Promise<IUserModel> {
        return super.create(options);
    }

    /**
   * Get User.
   * @property {string} id - The _id of the record.
   * @returns {User}
   */
    public async get(query: IQueryGet): Promise<Nullable<IUserModel>> {
        return super.getById(query.id);
    }
    /**
   * Count User.
   * @property - Total number of users.
   * @returns -Total number of users.
   */

    public async count(): Promise<number> {
        return super.count();
    }

    public async findOne(query): Promise<IUserModel> {
        return super.findOne(query);
    }

    /**
   * Update new user
   * @property {string} first_name - The first_name of record.
   * @returns {User}
   */
    public async update(options: IQueryUpdate): Promise<IUserModel> {
        return super.update(options);
    }

    /**
   * Delete user
   * @property {string} first_name - The name of record.
   * @returns {User}
   */
    public async delete(query: IQueryDelete): Promise<IUserModel> {
        return super.remove(query.id);
    }
}
export default UserRepository;
