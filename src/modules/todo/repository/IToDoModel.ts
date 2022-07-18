import IBaseDocument from '../../../libs/BaseRepo/IBaseDocument';

interface IToDoModel extends IBaseDocument {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default IToDoModel;
