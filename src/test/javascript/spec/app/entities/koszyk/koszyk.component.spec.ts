import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { KoszykComponent } from 'app/entities/koszyk/koszyk.component';
import { KoszykService } from 'app/entities/koszyk/koszyk.service';
import { Koszyk } from 'app/shared/model/koszyk.model';

describe('Component Tests', () => {
  describe('Koszyk Management Component', () => {
    let comp: KoszykComponent;
    let fixture: ComponentFixture<KoszykComponent>;
    let service: KoszykService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [KoszykComponent],
      })
        .overrideTemplate(KoszykComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KoszykComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KoszykService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Koszyk(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.koszyks && comp.koszyks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
