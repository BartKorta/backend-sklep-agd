import { IKoszyk } from 'app/shared/model/koszyk.model';
import { IProdukt } from 'app/shared/model/produkt.model';
import { IZamowienie } from 'app/shared/model/zamowienie.model';

export interface IProduktKoszyk {
  id?: number;
  ilosc?: number;
  suma?: number;
  koszyk?: IKoszyk;
  produkt?: IProdukt;
  zamowienie?: IZamowienie;
}

export class ProduktKoszyk implements IProduktKoszyk {
  constructor(
    public id?: number,
    public ilosc?: number,
    public suma?: number,
    public koszyk?: IKoszyk,
    public produkt?: IProdukt,
    public zamowienie?: IZamowienie
  ) {}
}
