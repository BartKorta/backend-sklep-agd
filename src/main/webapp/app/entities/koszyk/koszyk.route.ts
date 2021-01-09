import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IKoszyk, Koszyk } from 'app/shared/model/koszyk.model';
import { KoszykService } from './koszyk.service';
import { KoszykComponent } from './koszyk.component';
import { KoszykDetailComponent } from './koszyk-detail.component';
import { KoszykUpdateComponent } from './koszyk-update.component';

@Injectable({ providedIn: 'root' })
export class KoszykResolve implements Resolve<IKoszyk> {
  constructor(private service: KoszykService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKoszyk> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((koszyk: HttpResponse<Koszyk>) => {
          if (koszyk.body) {
            return of(koszyk.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Koszyk());
  }
}

export const koszykRoute: Routes = [
  {
    path: '',
    component: KoszykComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Koszyks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: KoszykDetailComponent,
    resolve: {
      koszyk: KoszykResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Koszyks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: KoszykUpdateComponent,
    resolve: {
      koszyk: KoszykResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Koszyks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: KoszykUpdateComponent,
    resolve: {
      koszyk: KoszykResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Koszyks',
    },
    canActivate: [UserRouteAccessService],
  },
];
