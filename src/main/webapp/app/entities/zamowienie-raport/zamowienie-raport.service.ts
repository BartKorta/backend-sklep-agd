import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';

type EntityResponseType = HttpResponse<IZamowienieRaport>;
type EntityArrayResponseType = HttpResponse<IZamowienieRaport[]>;

@Injectable({ providedIn: 'root' })
export class ZamowienieRaportService {
  public resourceUrl = SERVER_API_URL + 'api/zamowienie-raports';

  constructor(protected http: HttpClient) {}

  create(zamowienieRaport: IZamowienieRaport): Observable<EntityResponseType> {
    return this.http.post<IZamowienieRaport>(this.resourceUrl, zamowienieRaport, { observe: 'response' });
  }

  update(zamowienieRaport: IZamowienieRaport): Observable<EntityResponseType> {
    return this.http.put<IZamowienieRaport>(this.resourceUrl, zamowienieRaport, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IZamowienieRaport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZamowienieRaport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
