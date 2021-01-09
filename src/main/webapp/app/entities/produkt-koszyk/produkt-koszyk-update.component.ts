import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduktKoszyk, ProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';
import { ProduktKoszykService } from './produkt-koszyk.service';
import { IKoszyk } from 'app/shared/model/koszyk.model';
import { KoszykService } from 'app/entities/koszyk/koszyk.service';
import { IProdukt } from 'app/shared/model/produkt.model';
import { ProduktService } from 'app/entities/produkt/produkt.service';
import { IZamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from 'app/entities/zamowienie/zamowienie.service';

type SelectableEntity = IKoszyk | IProdukt | IZamowienie;

@Component({
  selector: 'jhi-produkt-koszyk-update',
  templateUrl: './produkt-koszyk-update.component.html',
})
export class ProduktKoszykUpdateComponent implements OnInit {
  isSaving = false;
  koszyks: IKoszyk[] = [];
  produkts: IProdukt[] = [];
  zamowienies: IZamowienie[] = [];

  editForm = this.fb.group({
    id: [],
    ilosc: [],
    suma: [],
    koszyk: [],
    produkt: [],
    zamowienie: [],
  });

  constructor(
    protected produktKoszykService: ProduktKoszykService,
    protected koszykService: KoszykService,
    protected produktService: ProduktService,
    protected zamowienieService: ZamowienieService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produktKoszyk }) => {
      this.updateForm(produktKoszyk);

      this.koszykService.query().subscribe((res: HttpResponse<IKoszyk[]>) => (this.koszyks = res.body || []));

      this.produktService.query().subscribe((res: HttpResponse<IProdukt[]>) => (this.produkts = res.body || []));

      this.zamowienieService.query().subscribe((res: HttpResponse<IZamowienie[]>) => (this.zamowienies = res.body || []));
    });
  }

  updateForm(produktKoszyk: IProduktKoszyk): void {
    this.editForm.patchValue({
      id: produktKoszyk.id,
      ilosc: produktKoszyk.ilosc,
      suma: produktKoszyk.suma,
      koszyk: produktKoszyk.koszyk,
      produkt: produktKoszyk.produkt,
      zamowienie: produktKoszyk.zamowienie,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produktKoszyk = this.createFromForm();
    if (produktKoszyk.id !== undefined) {
      this.subscribeToSaveResponse(this.produktKoszykService.update(produktKoszyk));
    } else {
      this.subscribeToSaveResponse(this.produktKoszykService.create(produktKoszyk));
    }
  }

  private createFromForm(): IProduktKoszyk {
    return {
      ...new ProduktKoszyk(),
      id: this.editForm.get(['id'])!.value,
      ilosc: this.editForm.get(['ilosc'])!.value,
      suma: this.editForm.get(['suma'])!.value,
      koszyk: this.editForm.get(['koszyk'])!.value,
      produkt: this.editForm.get(['produkt'])!.value,
      zamowienie: this.editForm.get(['zamowienie'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduktKoszyk>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
