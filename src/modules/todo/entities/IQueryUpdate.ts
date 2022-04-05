import IQueryBaseUpdate from './IQueryBaseUpdate';

interface IQueryUpdate extends IQueryBaseUpdate {
  title?: string;
  description?: string;
  status?:string;
}

export default IQueryUpdate;
