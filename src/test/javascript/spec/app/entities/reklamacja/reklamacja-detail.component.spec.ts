import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ReklamacjaDetailComponent } from 'app/entities/reklamacja/reklamacja-detail.component';
import { Reklamacja } from 'app/shared/model/reklamacja.model';

describe('Component Tests', () => {
  describe('Reklamacja Management Detail Component', () => {
    let comp: ReklamacjaDetailComponent;
    let fixture: ComponentFixture<ReklamacjaDetailComponent>;
    const route = ({ data: of({ reklamacja: new Reklamacja(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ReklamacjaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ReklamacjaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReklamacjaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reklamacja on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reklamacja).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
