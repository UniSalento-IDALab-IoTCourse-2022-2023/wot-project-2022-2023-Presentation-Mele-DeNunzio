import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BoxRange } from 'src/app/interfaces/box-range';

@Injectable({
  providedIn: 'root'
})
export class IotApiService {

  //baseUrl:string = "http://192.168.1.22:3000"
  baseUrl:string = "http://localhost:3000"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  constructor(private http:HttpClient) { }

  setParams(params: BoxRange): void {
    this.http.post<any>(this.baseUrl + "/set_params", params, this.httpOptions)
        .subscribe(
            response => {
              console.log(response)
            },
            error => {
              console.log("Errore durante la richiesta:", error);
              // gestire l'errore qui
            }
        );
  }

  startAnalysis(): void {
    this.http.get<any>(this.baseUrl + "/start_analysis", this.httpOptions).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log("Errore durante la richiesta:", error);
        // gestire l'errore qui
      }
  );
  }

  stopAnalysis(): void {
    this.http.get<any>(this.baseUrl + "/stop_analysis", this.httpOptions).subscribe(
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




