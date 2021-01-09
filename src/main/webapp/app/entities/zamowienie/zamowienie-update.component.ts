import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IZamowienie, Zamowienie } from 'app/shared/model/zamowienie.model';
import { ZamowienieService } from './zamowienie.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-zamowienie-update',
  templateUrl: './zamowienie-update.component.html',
})
export class ZamowienieUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    suma: [],
    dataZamowienia: [],
    user: [],
  });

  constructor(
    protected zamowienieService: ZamowienieService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zamowienie }) => {
      if (!zamowienie.id) {
        const today = moment().startOf('day');
        zamowienie.dataZamowienia = today;
      }

      this.updateForm(zamowienie);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(zamowienie: IZamowienie): void {
    this.editForm.patchValue({
      id: zamowienie.id,
      suma: zamowienie.suma,
      dataZamowienia: zamowienie.dataZamowienia ? zamowienie.dataZamowienia.format(DATE_TIME_FORMAT) : null,
      user: zamowienie.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zamowienie = this.createFromForm();
    if (zamowienie.id !== undefined) {
      this.subscribeToSaveResponse(this.zamowienieService.update(zamowienie));
    } else {
      this.subscribeToSaveResponse(this.zamowienieService.create(zamowienie));
    }
  }

  private createFromForm(): IZamowienie {
    return {
      ...new Zamowienie(),
      id: this.editForm.get(['id'])!.value,
      suma: this.editForm.get(['suma'])!.value,
      dataZamowienia: this.editForm.get(['dataZamowienia'])!.value
        ? moment(this.editForm.get(['dataZamowienia'])!.value, DATE_TIME_FORMAT)
        : undefined,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZamowienie>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
