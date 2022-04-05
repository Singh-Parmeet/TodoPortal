import IEntity from '../../entities/IEntity';

interface IToDo extends IEntity {
  title: string;
  description: string;
  status: string;
}

export default IToDo;
