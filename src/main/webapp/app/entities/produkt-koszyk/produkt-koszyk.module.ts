import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { ProduktKoszykComponent } from './produkt-koszyk.component';
import { ProduktKoszykDetailComponent } from './produkt-koszyk-detail.component';
import { ProduktKoszykUpdateComponent } from './produkt-koszyk-update.component';
import { ProduktKoszykDeleteDialogComponent } from './produkt-koszyk-delete-dialog.component';
import { produktKoszykRoute } from './produkt-koszyk.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(produktKoszykRoute)],
  declarations: [ProduktKoszykComponent, ProduktKoszykDetailComponent, ProduktKoszykUpdateComponent, ProduktKoszykDeleteDialogComponent],
  entryComponents: [ProduktKoszykDeleteDialogComponent],
})
export class BackendSklepAgdProduktKoszykModule {}
