import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRaport } from 'app/shared/model/raport.model';
import { RaportService } from './raport.service';
import { RaportDeleteDialogComponent } from './raport-delete-dialog.component';

@Component({
  selector: 'jhi-raport',
  templateUrl: './raport.component.html',
})
export class RaportComponent implements OnInit, OnDestroy {
  raports?: IRaport[];
  eventSubscriber?: Subscription;

  constructor(protected raportService: RaportService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.raportService.query().subscribe((res: HttpResponse<IRaport[]>) => (this.raports = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRaports();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRaport): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRaports(): void {
    this.eventSubscriber = this.eventManager.subscribe('raportListModification', () => this.loadAll());
  }

  delete(raport: IRaport): void {
    const modalRef = this.modalService.open(RaportDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.raport = raport;
  }
}
