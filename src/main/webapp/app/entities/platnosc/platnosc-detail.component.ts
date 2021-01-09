import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlatnosc } from 'app/shared/model/platnosc.model';

@Component({
  selector: 'jhi-platnosc-detail',
  templateUrl: './platnosc-detail.component.html',
})
export class PlatnoscDetailComponent implements OnInit {
  platnosc: IPlatnosc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ platnosc }) => (this.platnosc = platnosc));
  }

  previousState(): void {
    window.history.back();
  }
}
