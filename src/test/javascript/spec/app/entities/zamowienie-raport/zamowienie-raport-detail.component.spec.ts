import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendSklepAgdTestModule } from '../../../test.module';
import { ZamowienieRaportDetailComponent } from 'app/entities/zamowienie-raport/zamowienie-raport-detail.component';
import { ZamowienieRaport } from 'app/shared/model/zamowienie-raport.model';

describe('Component Tests', () => {
  describe('ZamowienieRaport Management Detail Component', () => {
    let comp: ZamowienieRaportDetailComponent;
    let fixture: ComponentFixture<ZamowienieRaportDetailComponent>;
    const route = ({ data: of({ zamowienieRaport: new ZamowienieRaport(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BackendSklepAgdTestModule],
        declarations: [ZamowienieRaportDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ZamowienieRaportDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ZamowienieRaportDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load zamowienieRaport on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.zamowienieRaport).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
