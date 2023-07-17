import { Injectable } from '@angular/core';
import { Box } from 'src/app/interfaces/box';

@Injectable({
  providedIn: 'root'
})
export class BoxServiceService {

  allBox: Box[] = []
  box:Box = {} as Box

  constructor() { 
    const min = 1;
    const max = 10000;
    
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    this.box.boxID = "id"+randomInt
    this.box.boxName = "Box1"
    this.box.tmin = 20
    this.box.tmax = 30
    this.box.umin = 30
    this.box.umax = 60
    this.box.pmin = 850
    this.box.pmax = 1000
    this.box.co2max = 400
    this.box.co2min = 400
    this.box.lum = 0
    this.box.oriz = 1
    this.allBox.push(this.box)

    this.box = {} as Box
    randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    this.box.boxID = "id"+randomInt
    this.box.boxName = "Box2"
    this.box.tmin = 0
    this.box.tmax = 0
    this.box.umin = 0
    this.box.umax = 0
    this.box.pmin = 800
    this.box.pmax = 800
    this.box.co2max = 300
    this.box.co2min = 300
    this.box.lum = 1
    this.box.oriz = 1
    this.allBox.push(this.box)

    this.box = {} as Box
    randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    this.box.boxID = "id"+randomInt
    this.box.boxName = "Box3"
    this.box.tmin = 30
    this.box.tmax = 40
    this.box.umin = 30
    this.box.umax = 60
    this.box.pmin = 800
    this.box.pmax = 1000
    this.box.co2max = 400
    this.box.co2min = 550
    this.box.lum = 2
    this.box.oriz = 0
    this.allBox.push(this.box)
   
  }

  onInit(){}

  onIonChange(ev: Event,boxId: string,value: string) {
    const box = this.allBox.find(box => box.boxID === boxId);
    if (box != null) {
      if (value == "tmin") {box.tmin = (ev as CustomEvent).detail.value}
      if (value == "tmax") {box.tmax = (ev as CustomEvent).detail.value}
      if (value == "pmin") {box.pmin = (ev as CustomEvent).detail.value}
      if (value == "pmax") {box.pmax = (ev as CustomEvent).detail.value}
      if (value == "umin") {box.umin = (ev as CustomEvent).detail.value}
      if (value == "umax") {box.umax = (ev as CustomEvent).detail.value}
      if (value == "co2min") {box.co2min = (ev as CustomEvent).detail.value}
      if (value == "co2max") {box.co2max = (ev as CustomEvent).detail.value}
      if (value == "lum") {box.lum = (ev as CustomEvent).detail.value}
      if (value == "oriz") {box.oriz = (ev as CustomEvent).detail.value}
    }
  }

  infoBox(boxId: string){
    const box = this.allBox.find(box => box.boxID === boxId); // trova l'indice dell'elemento con lastEmittedValue[0] uguale a boxName
    return box
  }
  

  addBox(ev: Event){

    const min = 1;
    const max = 10000;
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

    this.box = {} as Box
    this.box.boxID = "id"+randomInt
    this.box.boxName = "New Box"
    this.box.tmin = 20
    this.box.tmax = 30
    this.box.umin = 20
    this.box.umax = 30
    this.box.pmin = 500
    this.box.pmax = 550
    this.box.co2max = 400
    this.box.co2min = 400
    this.box.lum = 0
    this.box.oriz = 0
    this.allBox.push(this.box)
  }

  removeBox(ev: Event,boxId: string){
    const boxIndex = this.allBox.findIndex(box => box.boxID === boxId); // trova l'indice dell'elemento con lastEmittedValue[0] uguale a boxName
    if (boxIndex !== -1) {
        this.allBox.splice(boxIndex, 1);
    }
  }
}
