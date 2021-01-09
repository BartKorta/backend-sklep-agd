import { IRaport } from 'app/shared/model/raport.model';
import { IZamowienie } from 'app/shared/model/zamowienie.model';

export interface IZamowienieRaport {
  id?: number;
  raport?: IRaport;
  zamowienie?: IZamowienie;
}

export class ZamowienieRaport implements IZamowienieRaport {
  constructor(public id?: number, public raport?: IRaport, public zamowienie?: IZamowienie) {}
}
