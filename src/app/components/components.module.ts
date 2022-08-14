import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecentlyViewedEggComponent } from './recently-viewed-egg/recently-viewed-egg.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RecentlyViewedEggComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RecentlyViewedEggComponent
  ]
})
export class ComponentsModule { }
