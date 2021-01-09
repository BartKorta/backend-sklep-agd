import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { PlatnoscComponent } from 'app/entities/platnosc/platnosc.component';
import { PlatnoscService } from 'app/entities/platnosc/platnosc.service';
import { Platnosc } from 'app/shared/model/platnosc.model';

describe('Component Tests', () => {
  describe('Platnosc Management Component', () => {
    let comp: PlatnoscComponent;
    let fixture: ComponentFixture<PlatnoscComponent>;
    let service: PlatnoscService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [PlatnoscComponent],
      })
        .overrideTemplate(PlatnoscComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlatnoscComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlatnoscService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Platnosc(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.platnoscs && comp.platnoscs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
