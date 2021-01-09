import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ZamowienieRaportUpdateComponent } from 'app/entities/zamowienie-raport/zamowienie-raport-update.component';
import { ZamowienieRaportService } from 'app/entities/zamowienie-raport/zamowienie-raport.service';
import { ZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';

describe('Component Tests', () => {
  describe('ZamowienieRaport Management Update Component', () => {
    let comp: ZamowienieRaportUpdateComponent;
    let fixture: ComponentFixture<ZamowienieRaportUpdateComponent>;
    let service: ZamowienieRaportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ZamowienieRaportUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ZamowienieRaportUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZamowienieRaportUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZamowienieRaportService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ZamowienieRaport(123);
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
        const entity = new ZamowienieRaport();
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
