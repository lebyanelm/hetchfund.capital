import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecentlyViewedEggComponent } from './recently-viewed-egg/recently-viewed-egg.component';
import { CurrencyResolverService } from '../services/currency-resolver.service';
import { EggComponent } from './egg/egg.component';
import { LoaderComponent } from './loader/loader.component';
import { IonicModule } from '@ionic/angular';
import { ModalModule } from 'angular-custom-modal';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ConsentComponent } from './consent/consent.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  RichTextEditorModule,
  ToolbarService,
  ResizeService,
} from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RecentlyViewedEggComponent,
    EggComponent,
    LoaderComponent,
    EditProfileComponent,
    ConsentComponent,
    CommentsSectionComponent,
  ],
  imports: [CommonModule, ModalModule, RichTextEditorModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    RecentlyViewedEggComponent,
    EggComponent,
    LoaderComponent,
    EditProfileComponent,
    ConsentComponent,
    CommentsSectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CurrencyResolverService,
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    ResizeService,
  ],
})
export class ComponentsModule {}
