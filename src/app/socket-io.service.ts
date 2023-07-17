import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

//const backendUri = "http://192.168.1.22:3001";
//const backendUri = "http://localhost:3001";
//TEST
const backendUri = "http://10.30.10.26:3001";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private clientSocket: socketIo.Socket;

  constructor() {
    this.clientSocket = socketIo.connect(backendUri);
    console.log("Connected to: " + backendUri)
  }

  subscribeToTopics(): void {

      // Effettua subscription ai topic
    this.clientSocket.emit('subscribe', 'temperature');
    this.clientSocket.emit('subscribe', 'pressure');
    this.clientSocket.emit('subscribe', 'humidity');
    this.clientSocket.emit('subscribe', 'co2');
    this.clientSocket.emit('subscribe', 'horizontal');
    this.clientSocket.emit('subscribe', 'light');

  }

  listenToAnomalies(): Observable<any> {
    return new Observable((observer) => {
      this.clientSocket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    this.clientSocket.disconnect();
  }
}