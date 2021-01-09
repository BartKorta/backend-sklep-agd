import { IUser } from 'app/core/user/user.model';

export interface IKoszyk {
  id?: number;
  user?: IUser;
}

export class Koszyk implements IKoszyk {
  constructor(public id?: number, public user?: IUser) {}
}
