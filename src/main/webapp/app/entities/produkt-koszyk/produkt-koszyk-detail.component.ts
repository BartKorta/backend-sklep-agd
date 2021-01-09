import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';

@Component({
  selector: 'jhi-produkt-koszyk-detail',
  templateUrl: './produkt-koszyk-detail.component.html',
})
export class ProduktKoszykDetailComponent implements OnInit {
  produktKoszyk: IProduktKoszyk | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produktKoszyk }) => (this.produktKoszyk = produktKoszyk));
  }

  previousState(): void {
    window.history.back();
  }
}
