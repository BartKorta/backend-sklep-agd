import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { RaportDetailComponent } from 'app/entities/raport/raport-detail.component';
import { Raport } from 'app/shared/model/raport.model';

describe('Component Tests', () => {
  describe('Raport Management Detail Component', () => {
    let comp: RaportDetailComponent;
    let fixture: ComponentFixture<RaportDetailComponent>;
    const route = ({ data: of({ raport: new Raport(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [RaportDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RaportDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RaportDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load raport on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.raport).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
