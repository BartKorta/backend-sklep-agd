import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DostawaService } from 'app/entities/dostawa/dostawa.service';
import { IDostawa, Dostawa } from 'app/shared/model/dostawa.model';

describe('Service Tests', () => {
  describe('Dostawa Service', () => {
    let injector: TestBed;
    let service: DostawaService;
    let httpMock: HttpTestingController;
    let elemDefault: IDostawa;
    let expectedResult: IDostawa | IDostawa[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DostawaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Dostawa(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataWysylki: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Dostawa', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataWysylki: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataWysylki: currentDate,
          },
          returnedFromService
        );

        service.create(new Dostawa()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Dostawa', () => {
        const returnedFromService = Object.assign(
          {
            adres: 'BBBBBB',
            numerKontaktowy: 'BBBBBB',
            dataWysylki: currentDate.format(DATE_TIME_FORMAT),
            dostawca: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataWysylki: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Dostawa', () => {
        const returnedFromService = Object.assign(
          {
            adres: 'BBBBBB',
            numerKontaktowy: 'BBBBBB',
            dataWysylki: currentDate.format(DATE_TIME_FORMAT),
            dostawca: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataWysylki: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Dostawa', () => {
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
