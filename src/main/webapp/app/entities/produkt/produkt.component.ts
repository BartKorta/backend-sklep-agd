import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProdukt } from 'app/shared/model/produkt.model';
import { ProduktService } from './produkt.service';
import { ProduktDeleteDialogComponent } from './produkt-delete-dialog.component';

@Component({
  selector: 'jhi-produkt',
  templateUrl: './produkt.component.html',
})
export class ProduktComponent implements OnInit, OnDestroy {
  produkts?: IProdukt[];
  eventSubscriber?: Subscription;

  constructor(protected produktService: ProduktService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.produktService.query().subscribe((res: HttpResponse<IProdukt[]>) => (this.produkts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProdukts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProdukt): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProdukts(): void {
    this.eventSubscriber = this.eventManager.subscribe('produktListModification', () => this.loadAll());
  }

  delete(produkt: IProdukt): void {
    const modalRef = this.modalService.open(ProduktDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.produkt = produkt;
  }
}
