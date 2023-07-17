import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxSettingsPageRoutingModule } from './box-settings-routing.module';

import { BoxSettingsPage } from './box-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxSettingsPageRoutingModule
  ],
  declarations: [BoxSettingsPage]
})
export class BoxSettingsPageModule {}
