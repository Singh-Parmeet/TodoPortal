import IToDo from './IToDo';
import ToDoRepository from './repository/ToDoRepository';

class ToDoService {
    private todoRepository: ToDoRepository;

    public constructor() {
        this.todoRepository = new ToDoRepository();
    }

    public async list(limit: number, skip: number, projection?): Promise<IToDo[]> {
        return this.todoRepository.list({ limit, skip }, projection);
    }

    public async create(query): Promise<IToDo> {
        return this.todoRepository.create(query);
    }

    public async get(query): Promise<IToDo> {
        const { id } = query;
        return this.todoRepository.get({ id });
    }

    public async update(option: string, query): Promise<IToDo> {
        return this.todoRepository.update(option, query);
    }

    // public async delete(query): Promise<mongoose.UpdateQuery<IToDo>> {
    //     const { id } = query;
    //     return this.todoRepository.delete({
    //         id,
    //     });
    // }
}

export default ToDoService;
