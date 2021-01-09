import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { DostawaComponent } from './dostawa.component';
import { DostawaDetailComponent } from './dostawa-detail.component';
import { DostawaUpdateComponent } from './dostawa-update.component';
import { DostawaDeleteDialogComponent } from './dostawa-delete-dialog.component';
import { dostawaRoute } from './dostawa.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(dostawaRoute)],
  declarations: [DostawaComponent, DostawaDetailComponent, DostawaUpdateComponent, DostawaDeleteDialogComponent],
  entryComponents: [DostawaDeleteDialogComponent],
})
export class BackendSklepAgdDostawaModule {}
