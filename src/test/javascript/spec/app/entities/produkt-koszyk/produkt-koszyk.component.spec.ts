import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ProduktKoszykComponent } from 'app/entities/produkt-koszyk/produkt-koszyk.component';
import { ProduktKoszykService } from 'app/entities/produkt-koszyk/produkt-koszyk.service';
import { ProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';

describe('Component Tests', () => {
  describe('ProduktKoszyk Management Component', () => {
    let comp: ProduktKoszykComponent;
    let fixture: ComponentFixture<ProduktKoszykComponent>;
    let service: ProduktKoszykService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ProduktKoszykComponent],
      })
        .overrideTemplate(ProduktKoszykComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduktKoszykComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProduktKoszykService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProduktKoszyk(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.produktKoszyks && comp.produktKoszyks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
