import { IZamowienie } from 'app/shared/model/zamowienie.model';

export interface IPlatnosc {
  id?: number;
  elektroniczna?: boolean;
  posrednik?: string;
  zamowienie?: IZamowienie;
}

export class Platnosc implements IPlatnosc {
  constructor(public id?: number, public elektroniczna?: boolean, public posrednik?: string, public zamowienie?: IZamowienie) {
    this.elektroniczna = this.elektroniczna || false;
  }
}
