import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { KoszykUpdateComponent } from 'app/entities/koszyk/koszyk-update.component';
import { KoszykService } from 'app/entities/koszyk/koszyk.service';
import { Koszyk } from 'app/shared/model/koszyk.model';

describe('Component Tests', () => {
  describe('Koszyk Management Update Component', () => {
    let comp: KoszykUpdateComponent;
    let fixture: ComponentFixture<KoszykUpdateComponent>;
    let service: KoszykService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [KoszykUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(KoszykUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KoszykUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KoszykService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Koszyk(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Koszyk();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
