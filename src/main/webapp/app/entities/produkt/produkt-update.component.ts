import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProdukt, Produkt } from 'app/shared/model/produkt.model';
import { ProduktService } from './produkt.service';

@Component({
  selector: 'jhi-produkt-update',
  templateUrl: './produkt-update.component.html',
})
export class ProduktUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nazwa: [null, [Validators.required]],
    cena: [null, [Validators.required]],
    opis: [],
    moc: [],
    dostepnosc: [],
    pojemnosc: [],
  });

  constructor(protected produktService: ProduktService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produkt }) => {
      this.updateForm(produkt);
    });
  }

  updateForm(produkt: IProdukt): void {
    this.editForm.patchValue({
      id: produkt.id,
      nazwa: produkt.nazwa,
      cena: produkt.cena,
      opis: produkt.opis,
      moc: produkt.moc,
      dostepnosc: produkt.dostepnosc,
      pojemnosc: produkt.pojemnosc,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produkt = this.createFromForm();
    if (produkt.id !== undefined) {
      this.subscribeToSaveResponse(this.produktService.update(produkt));
    } else {
      this.subscribeToSaveResponse(this.produktService.create(produkt));
    }
  }

  private createFromForm(): IProdukt {
    return {
      ...new Produkt(),
      id: this.editForm.get(['id'])!.value,
      nazwa: this.editForm.get(['nazwa'])!.value,
      cena: this.editForm.get(['cena'])!.value,
      opis: this.editForm.get(['opis'])!.value,
      moc: this.editForm.get(['moc'])!.value,
      dostepnosc: this.editForm.get(['dostepnosc'])!.value,
      pojemnosc: this.editForm.get(['pojemnosc'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProdukt>>): void {
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
