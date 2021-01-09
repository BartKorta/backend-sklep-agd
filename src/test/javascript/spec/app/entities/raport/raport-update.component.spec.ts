import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { RaportUpdateComponent } from 'app/entities/raport/raport-update.component';
import { RaportService } from 'app/entities/raport/raport.service';
import { Raport } from 'app/shared/model/raport.model';

describe('Component Tests', () => {
  describe('Raport Management Update Component', () => {
    let comp: RaportUpdateComponent;
    let fixture: ComponentFixture<RaportUpdateComponent>;
    let service: RaportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [RaportUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RaportUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RaportUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RaportService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Raport(123);
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
        const entity = new Raport();
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
