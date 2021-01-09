import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { DostawaDetailComponent } from 'app/entities/dostawa/dostawa-detail.component';
import { Dostawa } from 'app/shared/model/dostawa.model';

describe('Component Tests', () => {
  describe('Dostawa Management Detail Component', () => {
    let comp: DostawaDetailComponent;
    let fixture: ComponentFixture<DostawaDetailComponent>;
    const route = ({ data: of({ dostawa: new Dostawa(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [DostawaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DostawaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DostawaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load dostawa on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dostawa).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
