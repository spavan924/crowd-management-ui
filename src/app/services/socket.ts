import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('https://hiring-dev.internal.kloudspot.com', {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('auth_token')
      }
    });
  }

  listenLiveOccupancy(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('live_occupancy', (data) => {
        observer.next(data);
      });
    });
  }

  listenAlerts(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('alert', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
