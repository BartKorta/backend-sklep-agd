import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProdukt } from 'app/shared/model/produkt.model';

@Component({
  selector: 'jhi-produkt-detail',
  templateUrl: './produkt-detail.component.html',
})
export class ProduktDetailComponent implements OnInit {
  produkt: IProdukt | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produkt }) => (this.produkt = produkt));
  }

  previousState(): void {
    window.history.back();
  }
}
