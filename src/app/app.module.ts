import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Timer } from './pages/main-page/timer';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IotApiService } from './services/iotApi/iot-api.service';
import { BoxServiceService } from './services/boxService/box-service.service';
import { CorsaServiceService } from './services/corsaService/corsa-service.service';
import { ServerApiService } from './services/serverApi/server-api.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Timer, IotApiService,BoxServiceService,CorsaServiceService,ServerApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
