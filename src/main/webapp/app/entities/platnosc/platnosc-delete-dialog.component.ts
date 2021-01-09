import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlatnosc } from 'app/shared/model/platnosc.model';
import { PlatnoscService } from './platnosc.service';

@Component({
  templateUrl: './platnosc-delete-dialog.component.html',
})
export class PlatnoscDeleteDialogComponent {
  platnosc?: IPlatnosc;

  constructor(protected platnoscService: PlatnoscService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.platnoscService.delete(id).subscribe(() => {
      this.eventManager.broadcast('platnoscListModification');
      this.activeModal.close();
    });
  }
}
