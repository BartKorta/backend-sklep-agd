import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ProduktUpdateComponent } from 'app/entities/produkt/produkt-update.component';
import { ProduktService } from 'app/entities/produkt/produkt.service';
import { Produkt } from 'app/shared/model/produkt.model';

describe('Component Tests', () => {
  describe('Produkt Management Update Component', () => {
    let comp: ProduktUpdateComponent;
    let fixture: ComponentFixture<ProduktUpdateComponent>;
    let service: ProduktService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ProduktUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProduktUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduktUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProduktService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Produkt(123);
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
        const entity = new Produkt();
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
