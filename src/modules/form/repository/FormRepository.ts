import * as mongoose from 'mongoose';
import FormModel from './FormModel';

class FormRepository {
    public static generateObjectId() {
        return String(new mongoose.Types.ObjectId());
    }

    // eslint-disable-next-line class-methods-use-this
    public async create1(options) {
        const id = FormRepository.generateObjectId();
        const result = new FormModel({
            ...options,
            _id: id,
        });
        return result.save();
    }

    // eslint-disable-next-line class-methods-use-this
    public async list(
        query : any = {},
        projection: any = {},
        options : any = {},
    ) {
        const option = options;
        option.limit = option.limit || 0;
        option.skip = option.skip || 0;
        return FormModel.find(query, projection, option);
    }
}

export default FormRepository;
