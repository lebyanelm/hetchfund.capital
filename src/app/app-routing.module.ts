import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contracts',
    pathMatch: 'full',
  },
  {
    path: 'contracts',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'contracts/view-history',
    loadChildren: () =>
      import('./pages/view-history/view-history.module').then(
        (m) => m.ViewHistoryPageModule
      ),
  },
  {
    path: 'contracts/:contract_key',
    loadChildren: () =>
      import('./pages/egg-campaign/egg-campaign.module').then(
        (m) => m.EggCampaignPageModule
      ),
  },
  {
    path: 'contracts/:contract_key/commitment',
    loadChildren: () =>
      import('./pages/choose-pledge-options/choose-pledge-options.module').then(
        (m) => m.ChoosePledgeOptionsPageModule
      ),
  },
  {
    path: 'contracts/:contract_key/commitment/choose-method',
    loadChildren: () =>
      import('./pages/choose-payment-method/choose-payment-method.module').then(
        (m) => m.ChoosePaymentMethodPageModule
      ),
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
    path: 'categories/:category_name',
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
    path: 'hetcher/:username/preferences/payments/add-method',
    loadChildren: () =>
      import('./pages/add-payment-method/add-payment-method.module').then(
        (m) => m.AddPaymentMethodPageModule
      ),
  },
  {
    path: 'choose-interests',
    loadChildren: () =>
      import('./pages/choose-interests/choose-interests.module').then(
        (m) => m.ChooseInterestsPageModule
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
