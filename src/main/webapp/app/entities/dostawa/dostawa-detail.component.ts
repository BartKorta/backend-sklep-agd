import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDostawa } from 'app/shared/model/dostawa.model';

@Component({
  selector: 'jhi-dostawa-detail',
  templateUrl: './dostawa-detail.component.html',
})
export class DostawaDetailComponent implements OnInit {
  dostawa: IDostawa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dostawa }) => (this.dostawa = dostawa));
  }

  previousState(): void {
    window.history.back();
  }
}
