import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IKoszyk, Koszyk } from 'app/shared/model/koszyk.model';
import { KoszykService } from './koszyk.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-koszyk-update',
  templateUrl: './koszyk-update.component.html',
})
export class KoszykUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    user: [],
  });

  constructor(
    protected koszykService: KoszykService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ koszyk }) => {
      this.updateForm(koszyk);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(koszyk: IKoszyk): void {
    this.editForm.patchValue({
      id: koszyk.id,
      user: koszyk.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const koszyk = this.createFromForm();
    if (koszyk.id !== undefined) {
      this.subscribeToSaveResponse(this.koszykService.update(koszyk));
    } else {
      this.subscribeToSaveResponse(this.koszykService.create(koszyk));
    }
  }

  private createFromForm(): IKoszyk {
    return {
      ...new Koszyk(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKoszyk>>): void {
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
