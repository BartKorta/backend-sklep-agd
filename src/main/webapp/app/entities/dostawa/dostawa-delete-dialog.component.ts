import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDostawa } from 'app/shared/model/dostawa.model';
import { DostawaService } from './dostawa.service';

@Component({
  templateUrl: './dostawa-delete-dialog.component.html',
})
export class DostawaDeleteDialogComponent {
  dostawa?: IDostawa;

  constructor(protected dostawaService: DostawaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dostawaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dostawaListModification');
      this.activeModal.close();
    });
  }
}
