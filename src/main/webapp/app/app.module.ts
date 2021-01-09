import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { BackendSklepAgdSharedModule } from 'app/shared/shared.module';
import { BackendSklepAgdCoreModule } from 'app/core/core.module';
import { BackendSklepAgdAppRoutingModule } from './app-routing.module';
import { BackendSklepAgdHomeModule } from './home/home.module';
import { BackendSklepAgdEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    BackendSklepAgdSharedModule,
    BackendSklepAgdCoreModule,
    BackendSklepAgdHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    BackendSklepAgdEntityModule,
    BackendSklepAgdAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class BackendSklepAgdAppModule {}
