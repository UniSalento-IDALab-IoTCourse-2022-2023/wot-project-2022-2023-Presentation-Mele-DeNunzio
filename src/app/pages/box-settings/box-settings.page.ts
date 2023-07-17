import { Component, OnInit } from '@angular/core';
import { BoxServiceService } from 'src/app/services/boxService/box-service.service';

@Component({
  selector: 'app-box-settings',
  templateUrl: './box-settings.page.html',
  styleUrls: ['./box-settings.page.scss'],
})
export class BoxSettingsPage implements OnInit {

  constructor(public boxServices: BoxServiceService) { }

  ngOnInit() {}


  onIonChange(ev: Event,boxId: string,value: string) {
    this.boxServices.onIonChange(ev,boxId,value)
  }
  addBox(ev: Event){
    this.boxServices.addBox(ev)
  }

  removeBox(ev: Event,boxId: string){
    this.boxServices.removeBox(ev,boxId)
  }

}
