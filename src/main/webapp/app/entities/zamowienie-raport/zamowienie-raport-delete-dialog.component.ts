import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';
import { ZamowienieRaportService } from './zamowienie-raport.service';

@Component({
  templateUrl: './zamowienie-raport-delete-dialog.component.html',
})
export class ZamowienieRaportDeleteDialogComponent {
  zamowienieRaport?: IZamowienieRaport;

  constructor(
    protected zamowienieRaportService: ZamowienieRaportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.zamowienieRaportService.delete(id).subscribe(() => {
      this.eventManager.broadcast('zamowienieRaportListModification');
      this.activeModal.close();
    });
  }
}
