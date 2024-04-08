import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  public socket: any;
  public readonly string = "ws://localhost:8080";

  constructor() {
    // this.socket = io();
  }

  // public listen(eventName: string) {
  //   return new Observable((subscriber) => {
  //     this.socket.on(eventName, (data: any) => {
  //       subscriber.next(data);
  //     });
  //   });
  // }

  // public emit(eventName: string, data: any) {
  //   this.socket.emit(eventName, data);
  // }
}
