import { Component } from '@angular/core';
import { SocketIoService } from './socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Corsa', url: '/fist-page', icon: 'time' },
    { title: 'Impostazioni Box', url: '/settings', icon: 'settings' },
  ];
  public labels = ['Label'];

  constructor() {}

}
