import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { ReklamacjaComponent } from './reklamacja.component';
import { ReklamacjaDetailComponent } from './reklamacja-detail.component';
import { ReklamacjaUpdateComponent } from './reklamacja-update.component';
import { ReklamacjaDeleteDialogComponent } from './reklamacja-delete-dialog.component';
import { reklamacjaRoute } from './reklamacja.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(reklamacjaRoute)],
  declarations: [ReklamacjaComponent, ReklamacjaDetailComponent, ReklamacjaUpdateComponent, ReklamacjaDeleteDialogComponent],
  entryComponents: [ReklamacjaDeleteDialogComponent],
})
export class BackendSklepAgdReklamacjaModule {}
