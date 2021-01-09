import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRaport } from 'app/shared/model/raport.model';
import { RaportService } from './raport.service';

@Component({
  templateUrl: './raport-delete-dialog.component.html',
})
export class RaportDeleteDialogComponent {
  raport?: IRaport;

  constructor(protected raportService: RaportService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.raportService.delete(id).subscribe(() => {
      this.eventManager.broadcast('raportListModification');
      this.activeModal.close();
    });
  }
}
