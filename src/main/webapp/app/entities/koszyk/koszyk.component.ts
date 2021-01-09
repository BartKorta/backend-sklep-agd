import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IKoszyk } from 'app/shared/model/koszyk.model';
import { KoszykService } from './koszyk.service';
import { KoszykDeleteDialogComponent } from './koszyk-delete-dialog.component';

@Component({
  selector: 'jhi-koszyk',
  templateUrl: './koszyk.component.html',
})
export class KoszykComponent implements OnInit, OnDestroy {
  koszyks?: IKoszyk[];
  eventSubscriber?: Subscription;

  constructor(protected koszykService: KoszykService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.koszykService.query().subscribe((res: HttpResponse<IKoszyk[]>) => (this.koszyks = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInKoszyks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IKoszyk): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInKoszyks(): void {
    this.eventSubscriber = this.eventManager.subscribe('koszykListModification', () => this.loadAll());
  }

  delete(koszyk: IKoszyk): void {
    const modalRef = this.modalService.open(KoszykDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.koszyk = koszyk;
  }
}
