import { IZamowienie } from 'app/shared/model/zamowienie.model';

export interface IReklamacja {
  id?: number;
  opis?: string;
  zamowienie?: IZamowienie;
}

export class Reklamacja implements IReklamacja {
  constructor(public id?: number, public opis?: string, public zamowienie?: IZamowienie) {}
}
