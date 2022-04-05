import IUser from './IUser';
import UserRepository from './repository/UserRepository';

class UserService {
    private userRepository: UserRepository;

    public constructor() {
        this.userRepository = new UserRepository();
    }

    /**
   * Get user list
   * @param {number} limit - Limit number of records to be returned.
   * @param {number} skip - Number of records to be skipped.
   * @returns {User[]}
   */
    public async list(limit: number, skip: number): Promise<IUser[]> {
        return this.userRepository.list({ limit, skip });
    }

    /**
   * Create new user
   * @param {string} firstname - The firstname of the user.
   * @param {string} lastname - The lastname of the user.
   * @returns {User}
   */
    public async create(query): Promise<IUser> {
        return this.userRepository.create(query);
    }

    /**
   * Get user
   * @param {string} id - The id of user.
   * @returns {User}
   */
    public async get(query): Promise<IUser> {
        const { id } = query;
        return this.userRepository.get({ id });
    }

    /**
   * Update user
   * @param {string} firstname - The firstname of user.
   * @param {string} originalId - The originalId of user.
   * @returns {User}
   */
    public async update(query): Promise<IUser> {
        return this.userRepository.update(query);
    }

    /**
   * Delete user
   * @param {string} id - The id of user.
   * @returns {User}
   */
    public async delete(query): Promise<IUser> {
        const { id } = query;
        return this.userRepository.delete({
            id,
        });
    }
}

export default UserService;
