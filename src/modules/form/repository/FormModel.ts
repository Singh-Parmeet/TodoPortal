/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';

const FormSchema = new mongoose.Schema(
    {},
    { strict: false },
);

const FormModel = mongoose.model('Product', FormSchema);

export default FormModel;
