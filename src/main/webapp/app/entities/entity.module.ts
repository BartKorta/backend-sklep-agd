import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'reklamacja',
        loadChildren: () => import('./reklamacja/reklamacja.module').then(m => m.BackendSklepAgdReklamacjaModule),
      },
      {
        path: 'zamowienie',
        loadChildren: () => import('./zamowienie/zamowienie.module').then(m => m.BackendSklepAgdZamowienieModule),
      },
      {
        path: 'platnosc',
        loadChildren: () => import('./platnosc/platnosc.module').then(m => m.BackendSklepAgdPlatnoscModule),
      },
      {
        path: 'dostawa',
        loadChildren: () => import('./dostawa/dostawa.module').then(m => m.BackendSklepAgdDostawaModule),
      },
      {
        path: 'raport',
        loadChildren: () => import('./raport/raport.module').then(m => m.BackendSklepAgdRaportModule),
      },
      {
        path: 'koszyk',
        loadChildren: () => import('./koszyk/koszyk.module').then(m => m.BackendSklepAgdKoszykModule),
      },
      {
        path: 'produkt-koszyk',
        loadChildren: () => import('./produkt-koszyk/produkt-koszyk.module').then(m => m.BackendSklepAgdProduktKoszykModule),
      },
      {
        path: 'produkt',
        loadChildren: () => import('./produkt/produkt.module').then(m => m.BackendSklepAgdProduktModule),
      },
      {
        path: 'zamowienie-raport',
        loadChildren: () => import('./zamowienie-raport/zamowienie-raport.module').then(m => m.BackendSklepAgdZamowienieRaportModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class BackendSklepAgdEntityModule {}
