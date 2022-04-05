import VersionableSchema from '../../../libs/versionable/VersionableSchema';

export default class ToDoSchema extends VersionableSchema {
    constructor(options: any) {
        const baseSchema = {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            status: {
                type: String,
                default: 'To Do',
            },
        };
        super(baseSchema, options);
    }
}
