import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fist-page',
    pathMatch: 'full'
  },
  {
    path: 'fist-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then( m => m.MainPagePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/box-settings/box-settings.module').then( m => m.BoxSettingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
