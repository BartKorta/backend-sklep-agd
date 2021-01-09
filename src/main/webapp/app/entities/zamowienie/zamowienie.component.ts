import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IZamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from './zamowienie.service';
import { ZamowienieDeleteDialogComponent } from './zamowienie-delete-dialog.component';

@Component({
  selector: 'jhi-zamowienie',
  templateUrl: './zamowienie.component.html',
})
export class ZamowienieComponent implements OnInit, OnDestroy {
  zamowienies?: IZamowienie[];
  eventSubscriber?: Subscription;

  constructor(protected zamowienieService: ZamowienieService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.zamowienieService.query().subscribe((res: HttpResponse<IZamowienie[]>) => (this.zamowienies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInZamowienies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IZamowienie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInZamowienies(): void {
    this.eventSubscriber = this.eventManager.subscribe('zamowienieListModification', () => this.loadAll());
  }

  delete(zamowienie: IZamowienie): void {
    const modalRef = this.modalService.open(ZamowienieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.zamowienie = zamowienie;
  }
}
