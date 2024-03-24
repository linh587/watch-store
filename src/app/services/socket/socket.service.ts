import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit(`${msg}`, msg);
  }

  on() {

  }
  getMessage() {
    return this.socket.fromEvent("message").pipe(map((data: any) => data.msg));
  }
}
