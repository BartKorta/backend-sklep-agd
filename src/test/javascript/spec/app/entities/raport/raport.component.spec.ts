import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { RaportComponent } from 'app/entities/raport/raport.component';
import { RaportService } from 'app/entities/raport/raport.service';
import { Raport } from 'app/shared/model/raport.model';

describe('Component Tests', () => {
  describe('Raport Management Component', () => {
    let comp: RaportComponent;
    let fixture: ComponentFixture<RaportComponent>;
    let service: RaportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [RaportComponent],
      })
        .overrideTemplate(RaportComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RaportComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RaportService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Raport(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.raports && comp.raports[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
