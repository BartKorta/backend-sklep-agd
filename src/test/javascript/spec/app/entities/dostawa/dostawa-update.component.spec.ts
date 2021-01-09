import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { DostawaUpdateComponent } from 'app/entities/dostawa/dostawa-update.component';
import { DostawaService } from 'app/entities/dostawa/dostawa.service';
import { Dostawa } from 'app/shared/model/dostawa.model';

describe('Component Tests', () => {
  describe('Dostawa Management Update Component', () => {
    let comp: DostawaUpdateComponent;
    let fixture: ComponentFixture<DostawaUpdateComponent>;
    let service: DostawaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [DostawaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DostawaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DostawaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DostawaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dostawa(123);
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
        const entity = new Dostawa();
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
