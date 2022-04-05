import IToDo from './IToDo';
import ToDoRepository from './repository/ToDoRepository';

class ToDoService {
    private todoRepository: ToDoRepository;

    public constructor() {
        this.todoRepository = new ToDoRepository();
    }

    /**
   * @param {number} limit - Limit number of records to be returned.
   * @param {number} skip - Number of records to be skipped.
   * @returns {Record[]}
   */
    public async list(limit: number, skip: number): Promise<IToDo[]> {
        return this.todoRepository.list({ limit, skip });
    }

    /**
   * @param {string} title - The title of record.
   * @param {string} description - The description of the record.
   * @returns {Record}
   */
    public async create(query): Promise<IToDo> {
        return this.todoRepository.create(query);
    }

    /**
   * @param {string} id - The id of Record.
   * @returns {Record}
   */
    public async get(query): Promise<IToDo> {
        const { id } = query;
        return this.todoRepository.get({ id });
    }

    /**
   * @param {string} id - The id of Record.
   * @param {string} title - The title of Record.
   * @param {string} description - The description of Record.
   * @param {string} status - The status of Record.
   * @returns {Record}
   */
    public async update(query): Promise<IToDo> {
        return this.todoRepository.update(query);
    }

    /**
   * @param {string} id - The id of Record.
   * @returns {Record}
   */
    public async delete(query): Promise<IToDo> {
        const { id } = query;
        return this.todoRepository.delete({
            id,
        });
    }
}

export default ToDoService;
