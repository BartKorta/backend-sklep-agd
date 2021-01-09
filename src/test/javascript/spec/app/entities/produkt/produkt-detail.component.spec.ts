import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ProduktDetailComponent } from 'app/entities/produkt/produkt-detail.component';
import { Produkt } from 'app/shared/model/produkt.model';

describe('Component Tests', () => {
  describe('Produkt Management Detail Component', () => {
    let comp: ProduktDetailComponent;
    let fixture: ComponentFixture<ProduktDetailComponent>;
    const route = ({ data: of({ produkt: new Produkt(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ProduktDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProduktDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProduktDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load produkt on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produkt).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
