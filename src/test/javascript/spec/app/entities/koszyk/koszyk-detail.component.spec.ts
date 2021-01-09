import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { KoszykDetailComponent } from 'app/entities/koszyk/koszyk-detail.component';
import { Koszyk } from 'app/shared/model/koszyk.model';

describe('Component Tests', () => {
  describe('Koszyk Management Detail Component', () => {
    let comp: KoszykDetailComponent;
    let fixture: ComponentFixture<KoszykDetailComponent>;
    const route = ({ data: of({ koszyk: new Koszyk(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [KoszykDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(KoszykDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KoszykDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load koszyk on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.koszyk).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
