import { Injectable } from '@angular/core';
import { range, single } from 'rxjs';
import { Alert } from 'src/app/interfaces/alert';
import { Anomalie } from 'src/app/interfaces/anomalie';
import { Box } from 'src/app/interfaces/box';
import { BoxRange } from 'src/app/interfaces/box-range';
import { EndRoute } from 'src/app/interfaces/end-route';
import { Storico } from 'src/app/interfaces/storico';
import { SocketIoService } from 'src/app/socket-io.service';
import { IotApiService } from '../iotApi/iot-api.service';
import { ServerApiService } from '../serverApi/server-api.service';
import { Anomalies } from 'src/app/interfaces/anomalies';
import { RangeAnomalies } from 'src/app/interfaces/range-anomalies';

@Injectable({
  providedIn: 'root'
})
export class CorsaServiceService {

  storici:Storico[] = [] //contengo gli id dei vari storici
  storico:Storico = {id: "", data: "", time: ""}

  alerts:Anomalie[] = []
  alert:Anomalie = {routeId: "", type: "", value: 0, time:"" }

  endRoute:EndRoute = {id:""} //da implementare

  id:string = ""
  tempID = ""; //Viene settato con l'id dell'acqusizione durante l'acquisizione, successivamente appena si finisce viene svuotato


  constructor(private socketService: SocketIoService, private iotService:IotApiService, private serverApiService:ServerApiService) { 
    this.socketService.subscribeToTopics();
    this.socketService.listenToAnomalies().subscribe((data) => {
      console.log(this.alert.routeId)
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      this.alert.routeId = this.id;
      this.alert.time = formattedTime;
      this.alert.type = data.topic
      this.alert.value = data.message
      console.log(`WARNING: Anomaly ${data.topic}: ${data.message}`);

      //Invio l'alert al back-end
      this.serverApiService.addAnomaly(this.alert)

      //Salvo gli alert della corsa
      this.alerts.push(this.alert)
      this.alert = {routeId: "", type: "", value: 0, time:"" }
    });
  }

  formatTime(milliseconds: number): string {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  async startCorsa(box:Box){

    let rangeBoxBackEnd = this.setBackEndParam(box);
    //console.log(rangeBoxBackEnd)

    //Parlo con il backEnd
    //Setto i parametri sul back end
    try {
      const response = await this.serverApiService.addRoute(rangeBoxBackEnd);
      console.log(response.response);
      this.id = response.response
      this.tempID = this.id;
      this.storico.id = this.id;
      // Gestisci la risposta qui
    } catch (error) {
      console.log("Errore:", error);
      this.id = "error"
    }
  
      
    if(this.id == "error") {
      const min = 1;
      const max = 10000;
      let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      this.id = "id" + randomInt;
      this.tempID = this.id;
      this.storico.id = this.id;
    }

    //Imposto i range da inviare al raspberry
    let rangeBox = this.setIotParam(box);
    //Parlo con il raspberry
    //Faccio partire l'acquisizione sul raspberry
    this.iotService.setParams(rangeBox);
    this.iotService.startAnalysis();

  }

  saveCorsa(elapsedTime:number, box:string) {
    //Salvataggio corsa
    this.storico.time = this.formatTime(elapsedTime)
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    this.storico.data = formattedDate;
    this.storici.push(this.storico);
    this.storico = {id: "", data: "", time: ""}
    this.tempID = ""

    //Parlo con il raspberry
    this.iotService.stopAnalysis(); //stoppo l'acquisizione sul raspberry

    //Stoppo l'acquisizione sul backEnd
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    let endRoute:EndRoute = {} as EndRoute;
    endRoute.id = this.id;
    console.log(endRoute)
    this.serverApiService.endRoute(endRoute);

  }

  setBackEndParam(box:Box) {
    //Parlo con il backEnd
    //Setto i parametri del backEnd
    let rangeBoxBackEnd:Anomalies = {} as Anomalies;
    rangeBoxBackEnd.description = "Descrizione"
    let anomaliesRange: RangeAnomalies[] = []
    
    let singleRange:RangeAnomalies = {} as RangeAnomalies;
    
    singleRange.type = "temperature"
    singleRange.minValue = box.tmin
    singleRange.maxValue = box.tmax
    anomaliesRange.push(singleRange)
    singleRange = {type: "", minValue: 0, maxValue: 0}

    singleRange.type = "humidity"
    singleRange.minValue = box.umin
    singleRange.maxValue = box.umax
    anomaliesRange.push(singleRange)
    singleRange = {type: "", minValue: 0, maxValue: 0}

    singleRange.type = "pressure"
    singleRange.minValue = box.pmin
    singleRange.maxValue = box.pmax
    anomaliesRange.push(singleRange)
    singleRange = {type: "", minValue: 0, maxValue: 0}

    singleRange.type = "co2"
    singleRange.minValue = box.co2min
    singleRange.maxValue = box.co2max 
    anomaliesRange.push(singleRange)
    singleRange = {type: "", minValue: 0, maxValue: 0}

    singleRange.type = "light"
    singleRange.minValue = box.lum
    singleRange.maxValue = box.lum
    anomaliesRange.push(singleRange)
    singleRange = {type: "", minValue: 0, maxValue: 0}

    singleRange.type = "horizontal"
    singleRange.minValue = box.oriz
    singleRange.maxValue = box.oriz
    anomaliesRange.push(singleRange)
    singleRange = {type: "", minValue: 0, maxValue: 0}

    rangeBoxBackEnd.anomalies = anomaliesRange
    return rangeBoxBackEnd
  }

  setIotParam(box:Box){
    let rangeBox:BoxRange = {} as BoxRange;
    rangeBox.minTemp = box.tmin
    rangeBox.maxTemp = box.tmax
    rangeBox.minCO2 = box.co2min
    rangeBox.maxCO2 = box.co2max
    rangeBox.maxHum = box.umax
    rangeBox.minHum = box.umin
    rangeBox.hasToBeDark = box.lum
    rangeBox.hasToBeHorizontal = box.oriz
    rangeBox.maxPress = box.pmax
    rangeBox.minPress = box.pmin
    return rangeBox;
  }
}
