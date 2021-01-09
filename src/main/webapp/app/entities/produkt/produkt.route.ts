import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProdukt, Produkt } from 'app/shared/model/produkt.model';
import { ProduktService } from './produkt.service';
import { ProduktComponent } from './produkt.component';
import { ProduktDetailComponent } from './produkt-detail.component';
import { ProduktUpdateComponent } from './produkt-update.component';

@Injectable({ providedIn: 'root' })
export class ProduktResolve implements Resolve<IProdukt> {
  constructor(private service: ProduktService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProdukt> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((produkt: HttpResponse<Produkt>) => {
          if (produkt.body) {
            return of(produkt.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Produkt());
  }
}

export const produktRoute: Routes = [
  {
    path: '',
    component: ProduktComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produkts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProduktDetailComponent,
    resolve: {
      produkt: ProduktResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produkts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProduktUpdateComponent,
    resolve: {
      produkt: ProduktResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produkts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProduktUpdateComponent,
    resolve: {
      produkt: ProduktResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produkts',
    },
    canActivate: [UserRouteAccessService],
  },
];
