import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IZamowienie {
  id?: number;
  suma?: number;
  dataZamowienia?: Moment;
  user?: IUser;
}

export class Zamowienie implements IZamowienie {
  constructor(public id?: number, public suma?: number, public dataZamowienia?: Moment, public user?: IUser) {}
}
