import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { PlatnoscComponent } from './platnosc.component';
import { PlatnoscDetailComponent } from './platnosc-detail.component';
import { PlatnoscUpdateComponent } from './platnosc-update.component';
import { PlatnoscDeleteDialogComponent } from './platnosc-delete-dialog.component';
import { platnoscRoute } from './platnosc.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(platnoscRoute)],
  declarations: [PlatnoscComponent, PlatnoscDetailComponent, PlatnoscUpdateComponent, PlatnoscDeleteDialogComponent],
  entryComponents: [PlatnoscDeleteDialogComponent],
})
export class BackendSklepAgdPlatnoscModule {}
