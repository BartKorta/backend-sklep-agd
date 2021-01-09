import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKoszyk } from 'app/shared/model/koszyk.model';

@Component({
  selector: 'jhi-koszyk-detail',
  templateUrl: './koszyk-detail.component.html',
})
export class KoszykDetailComponent implements OnInit {
  koszyk: IKoszyk | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ koszyk }) => (this.koszyk = koszyk));
  }

  previousState(): void {
    window.history.back();
  }
}
