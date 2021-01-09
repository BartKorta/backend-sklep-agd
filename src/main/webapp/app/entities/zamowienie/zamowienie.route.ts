import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IZamowienie, Zamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from './zamowienie.service';
import { ZamowienieComponent } from './zamowienie.component';
import { ZamowienieDetailComponent } from './zamowienie-detail.component';
import { ZamowienieUpdateComponent } from './zamowienie-update.component';

@Injectable({ providedIn: 'root' })
export class ZamowienieResolve implements Resolve<IZamowienie> {
  constructor(private service: ZamowienieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IZamowienie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((zamowienie: HttpResponse<Zamowienie>) => {
          if (zamowienie.body) {
            return of(zamowienie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Zamowienie());
  }
}

export const zamowienieRoute: Routes = [
  {
    path: '',
    component: ZamowienieComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Zamowienies',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ZamowienieDetailComponent,
    resolve: {
      zamowienie: ZamowienieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Zamowienies',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ZamowienieUpdateComponent,
    resolve: {
      zamowienie: ZamowienieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Zamowienies',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ZamowienieUpdateComponent,
    resolve: {
      zamowienie: ZamowienieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Zamowienies',
    },
    canActivate: [UserRouteAccessService],
  },
];
