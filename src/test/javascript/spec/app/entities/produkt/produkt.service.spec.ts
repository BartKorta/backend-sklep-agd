import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProduktService } from 'app/entities/produkt/produkt.service';
import { IProdukt, Produkt } from 'app/shared/model/produkt.model';

describe('Service Tests', () => {
  describe('Produkt Service', () => {
    let injector: TestBed;
    let service: ProduktService;
    let httpMock: HttpTestingController;
    let elemDefault: IProdukt;
    let expectedResult: IProdukt | IProdukt[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProduktService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Produkt(0, 'AAAAAAA', 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Produkt', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Produkt()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Produkt', () => {
        const returnedFromService = Object.assign(
          {
            nazwa: 'BBBBBB',
            cena: 1,
            opis: 'BBBBBB',
            moc: 'BBBBBB',
            dostepnosc: 'BBBBBB',
            pojemnosc: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Produkt', () => {
        const returnedFromService = Object.assign(
          {
            nazwa: 'BBBBBB',
            cena: 1,
            opis: 'BBBBBB',
            moc: 'BBBBBB',
            dostepnosc: 'BBBBBB',
            pojemnosc: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Produkt', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
