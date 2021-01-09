import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlatnosc, Platnosc } from 'app/shared/model/platnosc.model';
import { PlatnoscService } from './platnosc.service';
import { PlatnoscComponent } from './platnosc.component';
import { PlatnoscDetailComponent } from './platnosc-detail.component';
import { PlatnoscUpdateComponent } from './platnosc-update.component';

@Injectable({ providedIn: 'root' })
export class PlatnoscResolve implements Resolve<IPlatnosc> {
  constructor(private service: PlatnoscService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlatnosc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((platnosc: HttpResponse<Platnosc>) => {
          if (platnosc.body) {
            return of(platnosc.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Platnosc());
  }
}

export const platnoscRoute: Routes = [
  {
    path: '',
    component: PlatnoscComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Platnoscs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlatnoscDetailComponent,
    resolve: {
      platnosc: PlatnoscResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Platnoscs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlatnoscUpdateComponent,
    resolve: {
      platnosc: PlatnoscResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Platnoscs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlatnoscUpdateComponent,
    resolve: {
      platnosc: PlatnoscResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Platnoscs',
    },
    canActivate: [UserRouteAccessService],
  },
];
