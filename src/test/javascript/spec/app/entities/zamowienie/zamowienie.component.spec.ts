import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ZamowienieComponent } from 'app/entities/zamowienie/zamowienie.component';
import { ZamowienieService } from 'app/entities/zamowienie/zamowienie.service';
import { Zamowienie } from 'app/shared/model/zamowienie.model';

describe('Component Tests', () => {
  describe('Zamowienie Management Component', () => {
    let comp: ZamowienieComponent;
    let fixture: ComponentFixture<ZamowienieComponent>;
    let service: ZamowienieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ZamowienieComponent],
      })
        .overrideTemplate(ZamowienieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZamowienieComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZamowienieService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Zamowienie(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.zamowienies && comp.zamowienies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
