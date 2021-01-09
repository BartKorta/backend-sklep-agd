import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRaport } from 'app/shared/model/raport.model';

type EntityResponseType = HttpResponse<IRaport>;
type EntityArrayResponseType = HttpResponse<IRaport[]>;

@Injectable({ providedIn: 'root' })
export class RaportService {
  public resourceUrl = SERVER_API_URL + 'api/raports';

  constructor(protected http: HttpClient) {}

  create(raport: IRaport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(raport);
    return this.http
      .post<IRaport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(raport: IRaport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(raport);
    return this.http
      .put<IRaport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRaport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRaport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(raport: IRaport): IRaport {
    const copy: IRaport = Object.assign({}, raport, {
      dataUtworzenia: raport.dataUtworzenia && raport.dataUtworzenia.isValid() ? raport.dataUtworzenia.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataUtworzenia = res.body.dataUtworzenia ? moment(res.body.dataUtworzenia) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((raport: IRaport) => {
        raport.dataUtworzenia = raport.dataUtworzenia ? moment(raport.dataUtworzenia) : undefined;
      });
    }
    return res;
  }
}
