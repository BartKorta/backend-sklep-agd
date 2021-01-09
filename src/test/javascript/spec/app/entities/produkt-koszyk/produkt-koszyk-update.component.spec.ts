import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ProduktKoszykUpdateComponent } from 'app/entities/produkt-koszyk/produkt-koszyk-update.component';
import { ProduktKoszykService } from 'app/entities/produkt-koszyk/produkt-koszyk.service';
import { ProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';

describe('Component Tests', () => {
  describe('ProduktKoszyk Management Update Component', () => {
    let comp: ProduktKoszykUpdateComponent;
    let fixture: ComponentFixture<ProduktKoszykUpdateComponent>;
    let service: ProduktKoszykService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ProduktKoszykUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProduktKoszykUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduktKoszykUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProduktKoszykService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProduktKoszyk(123);
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
        const entity = new ProduktKoszyk();
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
