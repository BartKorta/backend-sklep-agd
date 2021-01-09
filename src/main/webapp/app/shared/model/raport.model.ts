import { Moment } from 'moment';

export interface IRaport {
  id?: number;
  opis?: string;
  dataUtworzenia?: Moment;
}

export class Raport implements IRaport {
  constructor(public id?: number, public opis?: string, public dataUtworzenia?: Moment) {}
}
