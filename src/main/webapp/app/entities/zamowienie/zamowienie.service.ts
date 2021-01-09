import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IZamowienie } from 'app/shared/model/zamowienie.model';

type EntityResponseType = HttpResponse<IZamowienie>;
type EntityArrayResponseType = HttpResponse<IZamowienie[]>;

@Injectable({ providedIn: 'root' })
export class ZamowienieService {
  public resourceUrl = SERVER_API_URL + 'api/zamowienies';

  constructor(protected http: HttpClient) {}

  create(zamowienie: IZamowienie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(zamowienie);
    return this.http
      .post<IZamowienie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(zamowienie: IZamowienie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(zamowienie);
    return this.http
      .put<IZamowienie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IZamowienie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IZamowienie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(zamowienie: IZamowienie): IZamowienie {
    const copy: IZamowienie = Object.assign({}, zamowienie, {
      dataZamowienia: zamowienie.dataZamowienia && zamowienie.dataZamowienia.isValid() ? zamowienie.dataZamowienia.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataZamowienia = res.body.dataZamowienia ? moment(res.body.dataZamowienia) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((zamowienie: IZamowienie) => {
        zamowienie.dataZamowienia = zamowienie.dataZamowienia ? moment(zamowienie.dataZamowienia) : undefined;
      });
    }
    return res;
  }
}
