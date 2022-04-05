import IQueryBaseCreate from './IQueryBaseCreate';

interface ICreate extends IQueryBaseCreate {
  title?: string;
  description?: string;
  status?: string;
 }

export default ICreate;
