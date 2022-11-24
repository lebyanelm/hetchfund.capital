import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SessionService } from './services/session.service';
import { ComponentsModule } from './components/components.module';
import { LoaderService } from './services/loader.service';
import { ModalModule } from 'angular-custom-modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CurrencyPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    ModalModule,
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SessionService,
    LoaderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
