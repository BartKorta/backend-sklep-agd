import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRaport, Raport } from 'app/shared/model/raport.model';
import { RaportService } from './raport.service';
import { RaportComponent } from './raport.component';
import { RaportDetailComponent } from './raport-detail.component';
import { RaportUpdateComponent } from './raport-update.component';

@Injectable({ providedIn: 'root' })
export class RaportResolve implements Resolve<IRaport> {
  constructor(private service: RaportService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRaport> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((raport: HttpResponse<Raport>) => {
          if (raport.body) {
            return of(raport.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Raport());
  }
}

export const raportRoute: Routes = [
  {
    path: '',
    component: RaportComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Raports',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RaportDetailComponent,
    resolve: {
      raport: RaportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Raports',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RaportUpdateComponent,
    resolve: {
      raport: RaportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Raports',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RaportUpdateComponent,
    resolve: {
      raport: RaportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Raports',
    },
    canActivate: [UserRouteAccessService],
  },
];
