import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlatnosc } from 'app/shared/model/platnosc.model';
import { PlatnoscService } from './platnosc.service';
import { PlatnoscDeleteDialogComponent } from './platnosc-delete-dialog.component';

@Component({
  selector: 'jhi-platnosc',
  templateUrl: './platnosc.component.html',
})
export class PlatnoscComponent implements OnInit, OnDestroy {
  platnoscs?: IPlatnosc[];
  eventSubscriber?: Subscription;

  constructor(protected platnoscService: PlatnoscService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.platnoscService.query().subscribe((res: HttpResponse<IPlatnosc[]>) => (this.platnoscs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPlatnoscs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPlatnosc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPlatnoscs(): void {
    this.eventSubscriber = this.eventManager.subscribe('platnoscListModification', () => this.loadAll());
  }

  delete(platnosc: IPlatnosc): void {
    const modalRef = this.modalService.open(PlatnoscDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.platnosc = platnosc;
  }
}
