import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ProduktKoszykDetailComponent } from 'app/entities/produkt-koszyk/produkt-koszyk-detail.component';
import { ProduktKoszyk } from 'app/shared/model/produkt-koszyk.model';

describe('Component Tests', () => {
  describe('ProduktKoszyk Management Detail Component', () => {
    let comp: ProduktKoszykDetailComponent;
    let fixture: ComponentFixture<ProduktKoszykDetailComponent>;
    const route = ({ data: of({ produktKoszyk: new ProduktKoszyk(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ProduktKoszykDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProduktKoszykDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProduktKoszykDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load produktKoszyk on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produktKoszyk).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
