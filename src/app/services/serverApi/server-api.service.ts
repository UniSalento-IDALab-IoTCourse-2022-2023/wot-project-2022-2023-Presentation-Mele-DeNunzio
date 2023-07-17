import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Anomalies } from 'src/app/interfaces/anomalies';
import { Anomalie } from 'src/app/interfaces/anomalie';
import { EndRoute } from 'src/app/interfaces/end-route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  //baseUrl:string = "http://192.168.1.52:8080"
  baseUrl:string = "http://3.231.200.225:8080"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  constructor(private http:HttpClient) { }

  addRoute(params: Anomalies): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.baseUrl + "/api/addRoute", params, this.httpOptions)
        .subscribe(
          response => {
            console.log(response);
            resolve(response);
          },
          error => {
            console.log("Errore durante la richiesta:", error);
            reject("error");
          }
        );
    });
  }

  addAnomaly(params:Anomalie): void {
    this.http.post<any>(this.baseUrl + "/api/addAnomaly", params, this.httpOptions).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log("Errore durante la richiesta:", error);
        // gestire l'errore qui
      }
  );
  }

  endRoute(params:EndRoute): void {
    this.http.post<any>(this.baseUrl + "/api/endRoute", params, this.httpOptions).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log("Errore durante la richiesta:", error);
        // gestire l'errore qui
      }
  );
}

}
