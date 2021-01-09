import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProduktKoszyk, ProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';
import { ProduktKoszykService } from './produkt-koszyk.service';
import { ProduktKoszykComponent } from './produkt-koszyk.component';
import { ProduktKoszykDetailComponent } from './produkt-koszyk-detail.component';
import { ProduktKoszykUpdateComponent } from './produkt-koszyk-update.component';

@Injectable({ providedIn: 'root' })
export class ProduktKoszykResolve implements Resolve<IProduktKoszyk> {
  constructor(private service: ProduktKoszykService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduktKoszyk> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((produktKoszyk: HttpResponse<ProduktKoszyk>) => {
          if (produktKoszyk.body) {
            return of(produktKoszyk.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProduktKoszyk());
  }
}

export const produktKoszykRoute: Routes = [
  {
    path: '',
    component: ProduktKoszykComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProduktKoszyks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProduktKoszykDetailComponent,
    resolve: {
      produktKoszyk: ProduktKoszykResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProduktKoszyks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProduktKoszykUpdateComponent,
    resolve: {
      produktKoszyk: ProduktKoszykResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProduktKoszyks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProduktKoszykUpdateComponent,
    resolve: {
      produktKoszyk: ProduktKoszykResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProduktKoszyks',
    },
    canActivate: [UserRouteAccessService],
  },
];
