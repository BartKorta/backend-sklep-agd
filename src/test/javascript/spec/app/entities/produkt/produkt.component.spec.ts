import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ProduktComponent } from 'app/entities/produkt/produkt.component';
import { ProduktService } from 'app/entities/produkt/produkt.service';
import { Produkt } from 'app/shared/model/produkt.model';

describe('Component Tests', () => {
  describe('Produkt Management Component', () => {
    let comp: ProduktComponent;
    let fixture: ComponentFixture<ProduktComponent>;
    let service: ProduktService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ProduktComponent],
      })
        .overrideTemplate(ProduktComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduktComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProduktService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Produkt(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.produkts && comp.produkts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
