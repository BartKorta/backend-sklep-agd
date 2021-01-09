import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRaport, Raport } from 'app/shared/model/raport.model';
import { RaportService } from './raport.service';

@Component({
  selector: 'jhi-raport-update',
  templateUrl: './raport-update.component.html',
})
export class RaportUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    opis: [],
    dataUtworzenia: [],
  });

  constructor(protected raportService: RaportService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ raport }) => {
      if (!raport.id) {
        const today = moment().startOf('day');
        raport.dataUtworzenia = today;
      }

      this.updateForm(raport);
    });
  }

  updateForm(raport: IRaport): void {
    this.editForm.patchValue({
      id: raport.id,
      opis: raport.opis,
      dataUtworzenia: raport.dataUtworzenia ? raport.dataUtworzenia.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const raport = this.createFromForm();
    if (raport.id !== undefined) {
      this.subscribeToSaveResponse(this.raportService.update(raport));
    } else {
      this.subscribeToSaveResponse(this.raportService.create(raport));
    }
  }

  private createFromForm(): IRaport {
    return {
      ...new Raport(),
      id: this.editForm.get(['id'])!.value,
      opis: this.editForm.get(['opis'])!.value,
      dataUtworzenia: this.editForm.get(['dataUtworzenia'])!.value
        ? moment(this.editForm.get(['dataUtworzenia'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRaport>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
