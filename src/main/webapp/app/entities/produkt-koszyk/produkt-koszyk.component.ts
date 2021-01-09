import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';
import { ProduktKoszykService } from './produkt-koszyk.service';
import { ProduktKoszykDeleteDialogComponent } from './produkt-koszyk-delete-dialog.component';

@Component({
  selector: 'jhi-produkt-koszyk',
  templateUrl: './produkt-koszyk.component.html',
})
export class ProduktKoszykComponent implements OnInit, OnDestroy {
  produktKoszyks?: IProduktKoszyk[];
  eventSubscriber?: Subscription;

  constructor(
    protected produktKoszykService: ProduktKoszykService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.produktKoszykService.query().subscribe((res: HttpResponse<IProduktKoszyk[]>) => (this.produktKoszyks = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProduktKoszyks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProduktKoszyk): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProduktKoszyks(): void {
    this.eventSubscriber = this.eventManager.subscribe('produktKoszykListModification', () => this.loadAll());
  }

  delete(produktKoszyk: IProduktKoszyk): void {
    const modalRef = this.modalService.open(ProduktKoszykDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.produktKoszyk = produktKoszyk;
  }
}
