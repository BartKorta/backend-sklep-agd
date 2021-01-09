export interface IProdukt {
  id?: number;
  nazwa?: string;
  cena?: number;
  opis?: string;
  moc?: string;
  dostepnosc?: string;
  pojemnosc?: string;
}

export class Produkt implements IProdukt {
  constructor(
    public id?: number,
    public nazwa?: string,
    public cena?: number,
    public opis?: string,
    public moc?: string,
    public dostepnosc?: string,
    public pojemnosc?: string
  ) {}
}
