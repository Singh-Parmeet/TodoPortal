import VersionableSchema from '../../../libs/versionable/VersionableSchema';

export default class UserSchema extends VersionableSchema {
    constructor(options: any) {
        const baseSchema = {
            first_name: {
                type: String,
            },
            last_name: {
                type: String,
            },
            email: {
                type: String,
            },
            password: {
                type: String,
            },
        };
        super(baseSchema, options);
    }
}
