import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IKoszyk } from 'app/shared/model/koszyk.model';

type EntityResponseType = HttpResponse<IKoszyk>;
type EntityArrayResponseType = HttpResponse<IKoszyk[]>;

@Injectable({ providedIn: 'root' })
export class KoszykService {
  public resourceUrl = SERVER_API_URL + 'api/koszyks';

  constructor(protected http: HttpClient) {}

  create(koszyk: IKoszyk): Observable<EntityResponseType> {
    return this.http.post<IKoszyk>(this.resourceUrl, koszyk, { observe: 'response' });
  }

  update(koszyk: IKoszyk): Observable<EntityResponseType> {
    return this.http.put<IKoszyk>(this.resourceUrl, koszyk, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKoszyk>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKoszyk[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
