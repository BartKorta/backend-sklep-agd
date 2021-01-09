import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';
import { ZamowienieRaportService } from './zamowienie-raport.service';
import { ZamowienieRaportDeleteDialogComponent } from './zamowienie-raport-delete-dialog.component';

@Component({
  selector: 'jhi-zamowienie-raport',
  templateUrl: './zamowienie-raport.component.html',
})
export class ZamowienieRaportComponent implements OnInit, OnDestroy {
  zamowienieRaports?: IZamowienieRaport[];
  eventSubscriber?: Subscription;

  constructor(
    protected zamowienieRaportService: ZamowienieRaportService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.zamowienieRaportService.query().subscribe((res: HttpResponse<IZamowienieRaport[]>) => (this.zamowienieRaports = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInZamowienieRaports();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IZamowienieRaport): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInZamowienieRaports(): void {
    this.eventSubscriber = this.eventManager.subscribe('zamowienieRaportListModification', () => this.loadAll());
  }

  delete(zamowienieRaport: IZamowienieRaport): void {
    const modalRef = this.modalService.open(ZamowienieRaportDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.zamowienieRaport = zamowienieRaport;
  }
}
