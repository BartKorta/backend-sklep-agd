import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { ProduktComponent } from './produkt.component';
import { ProduktDetailComponent } from './produkt-detail.component';
import { ProduktUpdateComponent } from './produkt-update.component';
import { ProduktDeleteDialogComponent } from './produkt-delete-dialog.component';
import { produktRoute } from './produkt.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(produktRoute)],
  declarations: [ProduktComponent, ProduktDetailComponent, ProduktUpdateComponent, ProduktDeleteDialogComponent],
  entryComponents: [ProduktDeleteDialogComponent],
})
export class BackendSklepAgdProduktModule {}
