import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDostawa, Dostawa } from 'app/shared/model/dostawa.model';
import { DostawaService } from './dostawa.service';
import { IZamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from 'app/entities/zamowienie/zamowienie.service';

@Component({
  selector: 'jhi-dostawa-update',
  templateUrl: './dostawa-update.component.html',
})
export class DostawaUpdateComponent implements OnInit {
  isSaving = false;
  zamowienies: IZamowienie[] = [];

  editForm = this.fb.group({
    id: [],
    adres: [null, [Validators.required]],
    numerKontaktowy: [null, [Validators.required]],
    dataWysylki: [],
    dostawca: [],
    zamowienie: [],
  });

  constructor(
    protected dostawaService: DostawaService,
    protected zamowienieService: ZamowienieService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dostawa }) => {
      if (!dostawa.id) {
        const today = moment().startOf('day');
        dostawa.dataWysylki = today;
      }

      this.updateForm(dostawa);

      this.zamowienieService
        .query({ filter: 'dostawa-is-null' })
        .pipe(
          map((res: HttpResponse<IZamowienie[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IZamowienie[]) => {
          if (!dostawa.zamowienie || !dostawa.zamowienie.id) {
            this.zamowienies = resBody;
          } else {
            this.zamowienieService
              .find(dostawa.zamowienie.id)
              .pipe(
                map((subRes: HttpResponse<IZamowienie>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IZamowienie[]) => (this.zamowienies = concatRes));
          }
        });
    });
  }

  updateForm(dostawa: IDostawa): void {
    this.editForm.patchValue({
      id: dostawa.id,
      adres: dostawa.adres,
      numerKontaktowy: dostawa.numerKontaktowy,
      dataWysylki: dostawa.dataWysylki ? dostawa.dataWysylki.format(DATE_TIME_FORMAT) : null,
      dostawca: dostawa.dostawca,
      zamowienie: dostawa.zamowienie,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dostawa = this.createFromForm();
    if (dostawa.id !== undefined) {
      this.subscribeToSaveResponse(this.dostawaService.update(dostawa));
    } else {
      this.subscribeToSaveResponse(this.dostawaService.create(dostawa));
    }
  }

  private createFromForm(): IDostawa {
    return {
      ...new Dostawa(),
      id: this.editForm.get(['id'])!.value,
      adres: this.editForm.get(['adres'])!.value,
      numerKontaktowy: this.editForm.get(['numerKontaktowy'])!.value,
      dataWysylki: this.editForm.get(['dataWysylki'])!.value
        ? moment(this.editForm.get(['dataWysylki'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dostawca: this.editForm.get(['dostawca'])!.value,
      zamowienie: this.editForm.get(['zamowienie'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDostawa>>): void {
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

  trackById(index: number, item: IZamowienie): any {
    return item.id;
  }
}
