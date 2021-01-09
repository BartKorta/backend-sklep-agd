import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { KoszykComponent } from './koszyk.component';
import { KoszykDetailComponent } from './koszyk-detail.component';
import { KoszykUpdateComponent } from './koszyk-update.component';
import { KoszykDeleteDialogComponent } from './koszyk-delete-dialog.component';
import { koszykRoute } from './koszyk.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(koszykRoute)],
  declarations: [KoszykComponent, KoszykDetailComponent, KoszykUpdateComponent, KoszykDeleteDialogComponent],
  entryComponents: [KoszykDeleteDialogComponent],
})
export class BackendSklepAgdKoszykModule {}
