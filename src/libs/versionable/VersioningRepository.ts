import * as mongoose from 'mongoose';
import {
    IQueryBaseCreate,
    IQueryBaseDelete,
    IQueryBaseUpdate,
} from '../../modules/user/entities';

export default class VersioningRepository <
D extends mongoose.Document, M extends mongoose.Model<D>
> {
    public static generateObjectId() {
        return String(new mongoose.Types.ObjectId());
    }

    private ModelType: M;

    constructor(modelType) {
        this.ModelType = modelType;
    }

    /**
   * Create new application
   * @property {string} body.name - The name of record.
   * @returns {Application}
   */
    public async create(options : IQueryBaseCreate): Promise < D > {
        const id = VersioningRepository.generateObjectId();
        const model = new this.ModelType(
            {
                ...options,
                _id: id,
            },
        );
        return model.save();
    }

    public async count(): Promise < number > {
        const query: any = {
            deletedAt: undefined,
        };
        return this.ModelType.count(query);
    }

    public async findOne(query : any): Promise < D > {
        const queryResponse: any = {
            ...query,
            deletedAt: undefined,
        };
        return this.ModelType.findOne(queryResponse);
    }

    /**
   * Create new application
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
    public async update(options : IQueryBaseUpdate): Promise < D > {
        const previous = await this.getById(options.id);
        const newInstance = Object.assign(previous.toJSON(), options);
        newInstance.id = VersioningRepository.generateObjectId();
        delete newInstance.deletedAt;

        const model = new this.ModelType(newInstance);
        return model.save();
    }

    protected async getAll(query : any = {}, options : any = {}): Promise < D[] > {
        const option = options;
        const queries = query;
        option.limit = option.limit || 0;
        option.skip = option.skip || 0;
        queries.deletedAt = undefined;
        return this.ModelType.find(queries, null, option);
    }

    protected async getByQuery(query : any): Promise < D > {
        return this.ModelType.findOne(query);
    }

    protected async getById(_id : string): Promise < any > {
        const filterQuery: any = {
            _id,
            deletedAt: null,
        };
        return this.ModelType.findOne(filterQuery);
    }

    protected getByIds(ids : string[]): Promise < D[] > {
        return this.getAll(
            {
                _id: {
                    $in: ids,
                },
            },
        );
    }

    protected async remove(id : string): Promise < D > {
        const result = await this.getById(id);
        if (result) {
            return this.invalidate(id);
        }
        return null;
    }

    protected async invalidate(id : string): Promise < D > {
        const now = new Date();
        const query: any = {
            deletedAt: null,
            id,
        };
        const update: any = {
            deletedAt: now,
        };
        return this.ModelType.findOneAndUpdate(query, update);
    }

    protected async hardRemove(query : IQueryBaseDelete): Promise < D > {
        return this.ModelType.remove(query);
    }
}
