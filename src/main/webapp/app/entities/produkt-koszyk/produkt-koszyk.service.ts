import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';

type EntityResponseType = HttpResponse<IProduktKoszyk>;
type EntityArrayResponseType = HttpResponse<IProduktKoszyk[]>;

@Injectable({ providedIn: 'root' })
export class ProduktKoszykService {
  public resourceUrl = SERVER_API_URL + 'api/produkt-koszyks';

  constructor(protected http: HttpClient) {}

  create(produktKoszyk: IProduktKoszyk): Observable<EntityResponseType> {
    return this.http.post<IProduktKoszyk>(this.resourceUrl, produktKoszyk, { observe: 'response' });
  }

  update(produktKoszyk: IProduktKoszyk): Observable<EntityResponseType> {
    return this.http.put<IProduktKoszyk>(this.resourceUrl, produktKoszyk, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduktKoszyk>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduktKoszyk[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
