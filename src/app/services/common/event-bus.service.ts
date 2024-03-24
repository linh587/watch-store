import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";

export class EventData {
  public name: string;
  public value: any;

  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }
}

@Injectable({
  providedIn: "root",
})
export class EventBusService {
  private subject$ = new Subject<EventData>();

  constructor() {}

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action?: any): Observable<any> {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])
    );
  }
}
