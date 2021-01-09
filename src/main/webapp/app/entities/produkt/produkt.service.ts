import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProdukt } from 'app/shared/model/produkt.model';

type EntityResponseType = HttpResponse<IProdukt>;
type EntityArrayResponseType = HttpResponse<IProdukt[]>;

@Injectable({ providedIn: 'root' })
export class ProduktService {
  public resourceUrl = SERVER_API_URL + 'api/produkts';

  constructor(protected http: HttpClient) {}

  create(produkt: IProdukt): Observable<EntityResponseType> {
    return this.http.post<IProdukt>(this.resourceUrl, produkt, { observe: 'response' });
  }

  update(produkt: IProdukt): Observable<EntityResponseType> {
    return this.http.put<IProdukt>(this.resourceUrl, produkt, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProdukt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProdukt[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
