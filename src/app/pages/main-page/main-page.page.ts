import { Component, OnInit } from '@angular/core';
import { Timer } from './timer';
import { CorsaServiceService } from 'src/app/services/corsaService/corsa-service.service';
import { BoxServiceService } from 'src/app/services/boxService/box-service.service';
import { Box } from 'src/app/interfaces/box';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  public elapsedTime: number = 0;
  startTime: number | null = null;
  interval: any = null;
  storageKey: string = 'timerState';
  timerVisibility:boolean = false;
  startAndStop:boolean = true;

  storageBoxVisibility:string = "boxVisibility";
  selectedBox:Box = {} as Box;
  visibilityBox:boolean = true;

  constructor(private timer: Timer, public corsaServices:CorsaServiceService, public boxServices: BoxServiceService) {}

  ngOnInit(): void {
    // Ripristina lo stato del timer dal localStorage
    const timerState = localStorage.getItem(this.storageKey);
    if (timerState) {
      this.timerVisibility = true;
      this.visibilityBox = false;
      this.selectedBox.boxName = localStorage.getItem(this.storageBoxVisibility)!;
      const state = JSON.parse(timerState);
      const currentTime = Date.now();
      const timePassed = currentTime - state.lastUpdateTime;
      this.startTime = state.startTime;
      this.elapsedTime = state.elapsedTime + timePassed;
      this.start();
    }
  }
  
  ngOnDestroy(): void {
    // Salva lo stato del timer nel localStorage quando l'utente lascia la pagina
    if (this.interval !== null) {
      const state = {
        startTime: this.startTime,
        elapsedTime: this.elapsedTime,
        lastUpdateTime: Date.now()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(state));
      localStorage.setItem(this.storageBoxVisibility, this.selectedBox.boxName);
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }

  start() {
    this.corsaServices.startCorsa(this.selectedBox);
    this.visibilityBox = false;
    if (this.interval === null) {
      if (this.startTime === null) {
        this.startTime = Date.now();
      } else {
        this.startTime = Date.now() - this.elapsedTime;
      }
      this.interval = setInterval(() => {
        if (this.startTime!=null)
        this.elapsedTime = Date.now() - this.startTime;
      }, 10);
    }
    this.startAndStop = false;
  }

  stop() {
    this.timer.stop();
    clearInterval(this.interval);
    this.interval = null;
  }

  reset() {

    //Salvataggio corsa
    this.corsaServices.saveCorsa(this.elapsedTime, this.selectedBox.boxName)

    //Stop Corsa
    this.timer.reset();
    clearInterval(this.interval);
    this.interval = null;
    this.elapsedTime = 0;
    this.startTime = null;
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.storageBoxVisibility)
    this.visibilityBox = true;
    this.timerVisibility = false;
  }

  onBoxSelect(event: any) {
    this.selectedBox = this.boxServices.infoBox(event.target.value)!;
    this.timerVisibility = true;
    this.startAndStop = true;
  }

}
