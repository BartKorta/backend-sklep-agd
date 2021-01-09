import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ReklamacjaUpdateComponent } from 'app/entities/reklamacja/reklamacja-update.component';
import { ReklamacjaService } from 'app/entities/reklamacja/reklamacja.service';
import { Reklamacja } from 'app/shared/model/reklamacja.model';

describe('Component Tests', () => {
  describe('Reklamacja Management Update Component', () => {
    let comp: ReklamacjaUpdateComponent;
    let fixture: ComponentFixture<ReklamacjaUpdateComponent>;
    let service: ReklamacjaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ReklamacjaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ReklamacjaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReklamacjaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReklamacjaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reklamacja(123);
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
        const entity = new Reklamacja();
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
