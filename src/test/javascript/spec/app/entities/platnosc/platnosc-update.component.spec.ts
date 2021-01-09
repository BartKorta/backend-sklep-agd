import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { PlatnoscUpdateComponent } from 'app/entities/platnosc/platnosc-update.component';
import { PlatnoscService } from 'app/entities/platnosc/platnosc.service';
import { Platnosc } from 'app/shared/model/platnosc.model';

describe('Component Tests', () => {
  describe('Platnosc Management Update Component', () => {
    let comp: PlatnoscUpdateComponent;
    let fixture: ComponentFixture<PlatnoscUpdateComponent>;
    let service: PlatnoscService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [PlatnoscUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PlatnoscUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlatnoscUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlatnoscService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Platnosc(123);
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
        const entity = new Platnosc();
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
