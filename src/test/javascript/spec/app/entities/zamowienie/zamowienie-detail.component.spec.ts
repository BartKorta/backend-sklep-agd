import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ZamowienieDetailComponent } from 'app/entities/zamowienie/zamowienie-detail.component';
import { Zamowienie } from 'app/shared/model/zamowienie.model';

describe('Component Tests', () => {
  describe('Zamowienie Management Detail Component', () => {
    let comp: ZamowienieDetailComponent;
    let fixture: ComponentFixture<ZamowienieDetailComponent>;
    const route = ({ data: of({ zamowienie: new Zamowienie(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ZamowienieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ZamowienieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ZamowienieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load zamowienie on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.zamowienie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
