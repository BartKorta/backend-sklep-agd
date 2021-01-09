import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ZamowienieUpdateComponent } from 'app/entities/zamowienie/zamowienie-update.component';
import { ZamowienieService } from 'app/entities/zamowienie/zamowienie.service';
import { Zamowienie } from 'app/shared/model/zamowienie.model';

describe('Component Tests', () => {
  describe('Zamowienie Management Update Component', () => {
    let comp: ZamowienieUpdateComponent;
    let fixture: ComponentFixture<ZamowienieUpdateComponent>;
    let service: ZamowienieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ZamowienieUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ZamowienieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZamowienieUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZamowienieService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Zamowienie(123);
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
        const entity = new Zamowienie();
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
