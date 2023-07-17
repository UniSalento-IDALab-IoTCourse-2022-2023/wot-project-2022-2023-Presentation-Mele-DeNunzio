import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxSettingsPage } from './box-settings.page';

const routes: Routes = [
  {
    path: '',
    component: BoxSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxSettingsPageRoutingModule {}
