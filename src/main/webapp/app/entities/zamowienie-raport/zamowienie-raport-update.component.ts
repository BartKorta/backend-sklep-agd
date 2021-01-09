import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IZamowienieRaport, ZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';
import { ZamowienieRaportService } from './zamowienie-raport.service';
import { IRaport } from 'app/shared/model/raport.model';
import { RaportService } from 'app/entities/raport/raport.service';
import { IZamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from 'app/entities/zamowienie/zamowienie.service';

type SelectableEntity = IRaport | IZamowienie;

@Component({
  selector: 'jhi-zamowienie-raport-update',
  templateUrl: './zamowienie-raport-update.component.html',
})
export class ZamowienieRaportUpdateComponent implements OnInit {
  isSaving = false;
  raports: IRaport[] = [];
  zamowienies: IZamowienie[] = [];

  editForm = this.fb.group({
    id: [],
    raport: [],
    zamowienie: [],
  });

  constructor(
    protected zamowienieRaportService: ZamowienieRaportService,
    protected raportService: RaportService,
    protected zamowienieService: ZamowienieService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zamowienieRaport }) => {
      this.updateForm(zamowienieRaport);

      this.raportService.query().subscribe((res: HttpResponse<IRaport[]>) => (this.raports = res.body || []));

      this.zamowienieService.query().subscribe((res: HttpResponse<IZamowienie[]>) => (this.zamowienies = res.body || []));
    });
  }

  updateForm(zamowienieRaport: IZamowienieRaport): void {
    this.editForm.patchValue({
      id: zamowienieRaport.id,
      raport: zamowienieRaport.raport,
      zamowienie: zamowienieRaport.zamowienie,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zamowienieRaport = this.createFromForm();
    if (zamowienieRaport.id !== undefined) {
      this.subscribeToSaveResponse(this.zamowienieRaportService.update(zamowienieRaport));
    } else {
      this.subscribeToSaveResponse(this.zamowienieRaportService.create(zamowienieRaport));
    }
  }

  private createFromForm(): IZamowienieRaport {
    return {
      ...new ZamowienieRaport(),
      id: this.editForm.get(['id'])!.value,
      raport: this.editForm.get(['raport'])!.value,
      zamowienie: this.editForm.get(['zamowienie'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZamowienieRaport>>): void {
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
