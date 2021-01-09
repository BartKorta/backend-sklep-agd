import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReklamacja } from 'app/shared/model/reklamacja.model';
import { ReklamacjaService } from './reklamacja.service';
import { ReklamacjaDeleteDialogComponent } from './reklamacja-delete-dialog.component';

@Component({
  selector: 'jhi-reklamacja',
  templateUrl: './reklamacja.component.html',
})
export class ReklamacjaComponent implements OnInit, OnDestroy {
  reklamacjas?: IReklamacja[];
  eventSubscriber?: Subscription;

  constructor(protected reklamacjaService: ReklamacjaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.reklamacjaService.query().subscribe((res: HttpResponse<IReklamacja[]>) => (this.reklamacjas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReklamacjas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReklamacja): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReklamacjas(): void {
    this.eventSubscriber = this.eventManager.subscribe('reklamacjaListModification', () => this.loadAll());
  }

  delete(reklamacja: IReklamacja): void {
    const modalRef = this.modalService.open(ReklamacjaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reklamacja = reklamacja;
  }
}
