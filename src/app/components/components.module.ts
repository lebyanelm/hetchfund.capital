import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecentlyViewedEggComponent } from './recently-viewed-egg/recently-viewed-egg.component';
import { CurrencyResolverService } from '../services/currency-resolver.service';
import { EggComponent } from './egg/egg.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RecentlyViewedEggComponent,
    EggComponent,
    LoaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    RecentlyViewedEggComponent,
    EggComponent,
    LoaderComponent,
  ],
  providers: [CurrencyResolverService],
})
export class ComponentsModule {}
