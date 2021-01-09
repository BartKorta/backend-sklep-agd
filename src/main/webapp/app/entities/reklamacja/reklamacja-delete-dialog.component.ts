import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReklamacja } from 'app/shared/model/reklamacja.model';
import { ReklamacjaService } from './reklamacja.service';

@Component({
  templateUrl: './reklamacja-delete-dialog.component.html',
})
export class ReklamacjaDeleteDialogComponent {
  reklamacja?: IReklamacja;

  constructor(
    protected reklamacjaService: ReklamacjaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reklamacjaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reklamacjaListModification');
      this.activeModal.close();
    });
  }
}
