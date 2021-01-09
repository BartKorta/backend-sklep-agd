import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { PlatnoscDetailComponent } from 'app/entities/platnosc/platnosc-detail.component';
import { Platnosc } from 'app/shared/model/platnosc.model';

describe('Component Tests', () => {
  describe('Platnosc Management Detail Component', () => {
    let comp: PlatnoscDetailComponent;
    let fixture: ComponentFixture<PlatnoscDetailComponent>;
    const route = ({ data: of({ platnosc: new Platnosc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [PlatnoscDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PlatnoscDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlatnoscDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load platnosc on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.platnosc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
