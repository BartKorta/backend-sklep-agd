import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDostawa } from 'app/shared/model/dostawa.model';
import { DostawaService } from './dostawa.service';
import { DostawaDeleteDialogComponent } from './dostawa-delete-dialog.component';

@Component({
  selector: 'jhi-dostawa',
  templateUrl: './dostawa.component.html',
})
export class DostawaComponent implements OnInit, OnDestroy {
  dostawas?: IDostawa[];
  eventSubscriber?: Subscription;

  constructor(protected dostawaService: DostawaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.dostawaService.query().subscribe((res: HttpResponse<IDostawa[]>) => (this.dostawas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDostawas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDostawa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDostawas(): void {
    this.eventSubscriber = this.eventManager.subscribe('dostawaListModification', () => this.loadAll());
  }

  delete(dostawa: IDostawa): void {
    const modalRef = this.modalService.open(DostawaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dostawa = dostawa;
  }
}
