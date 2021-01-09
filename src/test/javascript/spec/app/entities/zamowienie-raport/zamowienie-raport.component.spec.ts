import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ZamowienieRaportComponent } from 'app/entities/zamowienie-raport/zamowienie-raport.component';
import { ZamowienieRaportService } from 'app/entities/zamowienie-raport/zamowienie-raport.service';
import { ZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';

describe('Component Tests', () => {
  describe('ZamowienieRaport Management Component', () => {
    let comp: ZamowienieRaportComponent;
    let fixture: ComponentFixture<ZamowienieRaportComponent>;
    let service: ZamowienieRaportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ZamowienieRaportComponent],
      })
        .overrideTemplate(ZamowienieRaportComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZamowienieRaportComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZamowienieRaportService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ZamowienieRaport(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.zamowienieRaports && comp.zamowienieRaports[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
