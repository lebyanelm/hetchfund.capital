import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaigns',
    pathMatch: 'full',
  },
  {
    path: 'campaigns',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'errors/:error_code',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
  {
    path: 'campaigns/:egg_key',
    loadChildren: () =>
      import('./pages/egg-campaign/egg-campaign.module').then(
        (m) => m.EggCampaignPageModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesPageModule
      ),
  },
  {
    path: 'categories/:categoryName',
    loadChildren: () =>
      import('./pages/selected-category/selected-category.module').then(
        (m) => m.SelectedCategoryPageModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'hetcher/:username',
    loadChildren: () =>
      import('./pages/hetcher/hetcher.module').then((m) => m.HetcherPageModule),
  },
  {
    path: 'payments/add-method',
    loadChildren: () =>
      import('./pages/add-payment-method/add-payment-method.module').then(
        (m) => m.AddPaymentMethodPageModule
      ),
  },
  {
    path: '**',
    redirectTo: 'errors/404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
