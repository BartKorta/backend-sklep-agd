import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlatnosc } from 'app/shared/model/platnosc.model';

type EntityResponseType = HttpResponse<IPlatnosc>;
type EntityArrayResponseType = HttpResponse<IPlatnosc[]>;

@Injectable({ providedIn: 'root' })
export class PlatnoscService {
  public resourceUrl = SERVER_API_URL + 'api/platnoscs';

  constructor(protected http: HttpClient) {}

  create(platnosc: IPlatnosc): Observable<EntityResponseType> {
    return this.http.post<IPlatnosc>(this.resourceUrl, platnosc, { observe: 'response' });
  }

  update(platnosc: IPlatnosc): Observable<EntityResponseType> {
    return this.http.put<IPlatnosc>(this.resourceUrl, platnosc, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlatnosc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlatnosc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
