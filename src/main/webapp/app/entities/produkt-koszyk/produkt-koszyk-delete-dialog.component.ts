import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';
import { ProduktKoszykService } from './produkt-koszyk.service';

@Component({
  templateUrl: './produkt-koszyk-delete-dialog.component.html',
})
export class ProduktKoszykDeleteDialogComponent {
  produktKoszyk?: IProduktKoszyk;

  constructor(
    protected produktKoszykService: ProduktKoszykService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produktKoszykService.delete(id).subscribe(() => {
      this.eventManager.broadcast('produktKoszykListModification');
      this.activeModal.close();
    });
  }
}
