import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReklamacja } from 'app/shared/model/reklamacja.model';

type EntityResponseType = HttpResponse<IReklamacja>;
type EntityArrayResponseType = HttpResponse<IReklamacja[]>;

@Injectable({ providedIn: 'root' })
export class ReklamacjaService {
  public resourceUrl = SERVER_API_URL + 'api/reklamacjas';

  constructor(protected http: HttpClient) {}

  create(reklamacja: IReklamacja): Observable<EntityResponseType> {
    return this.http.post<IReklamacja>(this.resourceUrl, reklamacja, { observe: 'response' });
  }

  update(reklamacja: IReklamacja): Observable<EntityResponseType> {
    return this.http.put<IReklamacja>(this.resourceUrl, reklamacja, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReklamacja>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReklamacja[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
