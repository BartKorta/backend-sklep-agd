import { Moment } from 'moment';
import { IZamowienie } from 'app/shared/model/zamowienie.model';

export interface IDostawa {
  id?: number;
  adres?: string;
  numerKontaktowy?: string;
  dataWysylki?: Moment;
  dostawca?: string;
  zamowienie?: IZamowienie;
}

export class Dostawa implements IDostawa {
  constructor(
    public id?: number,
    public adres?: string,
    public numerKontaktowy?: string,
    public dataWysylki?: Moment,
    public dostawca?: string,
    public zamowienie?: IZamowienie
  ) {}
}
