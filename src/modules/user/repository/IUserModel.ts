import IVersionableDocument from '../../../libs/versionable/IVersionableDocument';

interface IUserModel extends IVersionableDocument {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default IUserModel;
