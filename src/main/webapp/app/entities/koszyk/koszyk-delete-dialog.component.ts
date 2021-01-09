import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKoszyk } from 'app/shared/model/koszyk.model';
import { KoszykService } from './koszyk.service';

@Component({
  templateUrl: './koszyk-delete-dialog.component.html',
})
export class KoszykDeleteDialogComponent {
  koszyk?: IKoszyk;

  constructor(protected koszykService: KoszykService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.koszykService.delete(id).subscribe(() => {
      this.eventManager.broadcast('koszykListModification');
      this.activeModal.close();
    });
  }
}
