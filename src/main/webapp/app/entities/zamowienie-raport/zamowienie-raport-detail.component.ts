import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';

@Component({
  selector: 'jhi-zamowienie-raport-detail',
  templateUrl: './zamowienie-raport-detail.component.html',
})
export class ZamowienieRaportDetailComponent implements OnInit {
  zamowienieRaport: IZamowienieRaport | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zamowienieRaport }) => (this.zamowienieRaport = zamowienieRaport));
  }

  previousState(): void {
    window.history.back();
  }
}
