import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IZamowienieRaport, ZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';
import { ZamowienieRaportService } from './zamowienie-raport.service';
import { ZamowienieRaportComponent } from './zamowienie-raport.component';
import { ZamowienieRaportDetailComponent } from './zamowienie-raport-detail.component';
import { ZamowienieRaportUpdateComponent } from './zamowienie-raport-update.component';

@Injectable({ providedIn: 'root' })
export class ZamowienieRaportResolve implements Resolve<IZamowienieRaport> {
  constructor(private service: ZamowienieRaportService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IZamowienieRaport> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((zamowienieRaport: HttpResponse<ZamowienieRaport>) => {
          if (zamowienieRaport.body) {
            return of(zamowienieRaport.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ZamowienieRaport());
  }
}

export const zamowienieRaportRoute: Routes = [
  {
    path: '',
    component: ZamowienieRaportComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ZamowienieRaports',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ZamowienieRaportDetailComponent,
    resolve: {
      zamowienieRaport: ZamowienieRaportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ZamowienieRaports',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ZamowienieRaportUpdateComponent,
    resolve: {
      zamowienieRaport: ZamowienieRaportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ZamowienieRaports',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ZamowienieRaportUpdateComponent,
    resolve: {
      zamowienieRaport: ZamowienieRaportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ZamowienieRaports',
    },
    canActivate: [UserRouteAccessService],
  },
];
