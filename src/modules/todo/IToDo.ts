import IEntity from '../../libs/entities/IEntity';

interface IToDo extends IEntity {
  title: string;
  description: string;
  status: string;
}

export default IToDo;
