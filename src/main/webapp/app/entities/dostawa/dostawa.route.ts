import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDostawa, Dostawa } from 'app/shared/model/dostawa.model';
import { DostawaService } from './dostawa.service';
import { DostawaComponent } from './dostawa.component';
import { DostawaDetailComponent } from './dostawa-detail.component';
import { DostawaUpdateComponent } from './dostawa-update.component';

@Injectable({ providedIn: 'root' })
export class DostawaResolve implements Resolve<IDostawa> {
  constructor(private service: DostawaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDostawa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dostawa: HttpResponse<Dostawa>) => {
          if (dostawa.body) {
            return of(dostawa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Dostawa());
  }
}

export const dostawaRoute: Routes = [
  {
    path: '',
    component: DostawaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Dostawas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DostawaDetailComponent,
    resolve: {
      dostawa: DostawaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Dostawas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DostawaUpdateComponent,
    resolve: {
      dostawa: DostawaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Dostawas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DostawaUpdateComponent,
    resolve: {
      dostawa: DostawaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Dostawas',
    },
    canActivate: [UserRouteAccessService],
  },
];
