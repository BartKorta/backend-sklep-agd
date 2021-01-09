import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { DostawaComponent } from 'app/entities/dostawa/dostawa.component';
import { DostawaService } from 'app/entities/dostawa/dostawa.service';
import { Dostawa } from 'app/shared/model/dostawa.model';

describe('Component Tests', () => {
  describe('Dostawa Management Component', () => {
    let comp: DostawaComponent;
    let fixture: ComponentFixture<DostawaComponent>;
    let service: DostawaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [DostawaComponent],
      })
        .overrideTemplate(DostawaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DostawaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DostawaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Dostawa(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dostawas && comp.dostawas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
