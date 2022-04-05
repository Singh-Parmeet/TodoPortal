import IVersionableDocument from '../../../libs/versionable/IVersionableDocument';

interface IToDoModel extends IVersionableDocument {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default IToDoModel;
