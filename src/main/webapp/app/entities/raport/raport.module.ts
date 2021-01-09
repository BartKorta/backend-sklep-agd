import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { RaportComponent } from './raport.component';
import { RaportDetailComponent } from './raport-detail.component';
import { RaportUpdateComponent } from './raport-update.component';
import { RaportDeleteDialogComponent } from './raport-delete-dialog.component';
import { raportRoute } from './raport.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(raportRoute)],
  declarations: [RaportComponent, RaportDetailComponent, RaportUpdateComponent, RaportDeleteDialogComponent],
  entryComponents: [RaportDeleteDialogComponent],
})
export class BackendSklepAgdRaportModule {}
