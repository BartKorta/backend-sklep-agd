import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlatnosc, Platnosc } from 'app/shared/model/platnosc.model';
import { PlatnoscService } from './platnosc.service';
import { IZamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from 'app/entities/zamowienie/zamowienie.service';

@Component({
  selector: 'jhi-platnosc-update',
  templateUrl: './platnosc-update.component.html',
})
export class PlatnoscUpdateComponent implements OnInit {
  isSaving = false;
  zamowienies: IZamowienie[] = [];

  editForm = this.fb.group({
    id: [],
    elektroniczna: [],
    posrednik: [],
    zamowienie: [],
  });

  constructor(
    protected platnoscService: PlatnoscService,
    protected zamowienieService: ZamowienieService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ platnosc }) => {
      this.updateForm(platnosc);

      this.zamowienieService
        .query({ filter: 'platnosc-is-null' })
        .pipe(
          map((res: HttpResponse<IZamowienie[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IZamowienie[]) => {
          if (!platnosc.zamowienie || !platnosc.zamowienie.id) {
            this.zamowienies = resBody;
          } else {
            this.zamowienieService
              .find(platnosc.zamowienie.id)
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

  updateForm(platnosc: IPlatnosc): void {
    this.editForm.patchValue({
      id: platnosc.id,
      elektroniczna: platnosc.elektroniczna,
      posrednik: platnosc.posrednik,
      zamowienie: platnosc.zamowienie,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const platnosc = this.createFromForm();
    if (platnosc.id !== undefined) {
      this.subscribeToSaveResponse(this.platnoscService.update(platnosc));
    } else {
      this.subscribeToSaveResponse(this.platnoscService.create(platnosc));
    }
  }

  private createFromForm(): IPlatnosc {
    return {
      ...new Platnosc(),
      id: this.editForm.get(['id'])!.value,
      elektroniczna: this.editForm.get(['elektroniczna'])!.value,
      posrednik: this.editForm.get(['posrednik'])!.value,
      zamowienie: this.editForm.get(['zamowienie'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlatnosc>>): void {
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
