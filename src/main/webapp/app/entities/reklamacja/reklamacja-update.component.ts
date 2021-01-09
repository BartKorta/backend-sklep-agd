import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IReklamacja, Reklamacja } from 'app/shared/model/reklamacja.model';
import { ReklamacjaService } from './reklamacja.service';
import { IZamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from 'app/entities/zamowienie/zamowienie.service';

@Component({
  selector: 'jhi-reklamacja-update',
  templateUrl: './reklamacja-update.component.html',
})
export class ReklamacjaUpdateComponent implements OnInit {
  isSaving = false;
  zamowienies: IZamowienie[] = [];

  editForm = this.fb.group({
    id: [],
    opis: [],
    zamowienie: [],
  });

  constructor(
    protected reklamacjaService: ReklamacjaService,
    protected zamowienieService: ZamowienieService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reklamacja }) => {
      this.updateForm(reklamacja);

      this.zamowienieService
        .query({ filter: 'reklamacja-is-null' })
        .pipe(
          map((res: HttpResponse<IZamowienie[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IZamowienie[]) => {
          if (!reklamacja.zamowienie || !reklamacja.zamowienie.id) {
            this.zamowienies = resBody;
          } else {
            this.zamowienieService
              .find(reklamacja.zamowienie.id)
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

  updateForm(reklamacja: IReklamacja): void {
    this.editForm.patchValue({
      id: reklamacja.id,
      opis: reklamacja.opis,
      zamowienie: reklamacja.zamowienie,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reklamacja = this.createFromForm();
    if (reklamacja.id !== undefined) {
      this.subscribeToSaveResponse(this.reklamacjaService.update(reklamacja));
    } else {
      this.subscribeToSaveResponse(this.reklamacjaService.create(reklamacja));
    }
  }

  private createFromForm(): IReklamacja {
    return {
      ...new Reklamacja(),
      id: this.editForm.get(['id'])!.value,
      opis: this.editForm.get(['opis'])!.value,
      zamowienie: this.editForm.get(['zamowienie'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReklamacja>>): void {
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
