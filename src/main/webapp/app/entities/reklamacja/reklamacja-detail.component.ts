import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReklamacja } from 'app/shared/model/reklamacja.model';

@Component({
  selector: 'jhi-reklamacja-detail',
  templateUrl: './reklamacja-detail.component.html',
})
export class ReklamacjaDetailComponent implements OnInit {
  reklamacja: IReklamacja | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reklamacja }) => (this.reklamacja = reklamacja));
  }

  previousState(): void {
    window.history.back();
  }
}
