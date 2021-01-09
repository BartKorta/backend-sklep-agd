import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { ZamowienieRaportComponent } from './zamowienie-raport.component';
import { ZamowienieRaportDetailComponent } from './zamowienie-raport-detail.component';
import { ZamowienieRaportUpdateComponent } from './zamowienie-raport-update.component';
import { ZamowienieRaportDeleteDialogComponent } from './zamowienie-raport-delete-dialog.component';
import { zamowienieRaportRoute } from './zamowienie-raport.route';

@NgModule({
  imports: [BackendSklepAgdSharedModule, RouterModule.forChild(zamowienieRaportRoute)],
  declarations: [
    ZamowienieRaportComponent,
    ZamowienieRaportDetailComponent,
    ZamowienieRaportUpdateComponent,
    ZamowienieRaportDeleteDialogComponent,
  ],
  entryComponents: [ZamowienieRaportDeleteDialogComponent],
})
export class BackendSklepAgdZamowienieRaportModule {}
