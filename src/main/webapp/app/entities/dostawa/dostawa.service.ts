import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDostawa } from 'app/shared/model/dostawa.model';

type EntityResponseType = HttpResponse<IDostawa>;
type EntityArrayResponseType = HttpResponse<IDostawa[]>;

@Injectable({ providedIn: 'root' })
export class DostawaService {
  public resourceUrl = SERVER_API_URL + 'api/dostawas';

  constructor(protected http: HttpClient) {}

  create(dostawa: IDostawa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dostawa);
    return this.http
      .post<IDostawa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(dostawa: IDostawa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dostawa);
    return this.http
      .put<IDostawa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDostawa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDostawa[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(dostawa: IDostawa): IDostawa {
    const copy: IDostawa = Object.assign({}, dostawa, {
      dataWysylki: dostawa.dataWysylki && dostawa.dataWysylki.isValid() ? dostawa.dataWysylki.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataWysylki = res.body.dataWysylki ? moment(res.body.dataWysylki) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((dostawa: IDostawa) => {
        dostawa.dataWysylki = dostawa.dataWysylki ? moment(dostawa.dataWysylki) : undefined;
      });
    }
    return res;
  }
}
