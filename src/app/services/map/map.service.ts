import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import {
  GOONGIO_API_KEY,
  GOONGIO_DIRECTION_API,
  GOONGIO_GEOCODING_API,
} from "../../public/constants/map";
import { BaseHttpRequest } from "../http/base-http-request.service";

export interface GoongIoAddressLocation {
  longitude: string;
  latitude: string;
  formattedAddress: string;
}

export interface GoongIoCoordinate {
  longitude: string;
  latitude: string;
}

@Injectable({
  providedIn: "root",
})
export class MapService extends BaseHttpRequest {
  private extractAddressLocationGoongIo(data: any): GoongIoAddressLocation {
    const formattedAddress = data?.["formatted_address"];
    const latitude = String(data?.["geometry"]["location"]["lat"] || "");
    const longitude = String(data?.["geometry"]["location"]["lng"] || "");
    return { formattedAddress, longitude, latitude };
  }

  public getLengthFromOriginToDestinationGoongIo(
    origin: GoongIoCoordinate,
    destination: GoongIoCoordinate
  ): Observable<number> {
    const getDirectionUrl = `${GOONGIO_DIRECTION_API}?api_key=${GOONGIO_API_KEY}&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;

    return this.httpClient.get(getDirectionUrl).pipe(
      catchError((error) => {
        console.error("Error in fetching direction data from Goong.io", error);
        return throwError("Error in fetching direction data from Goong.io");
      }),
      map((response: any) => {
        const distance = response?.routes?.[0]?.legs?.[0]?.distance;
        return distance ? Number(distance.value || 0) : -1;
      })
    );
  }

  public searchAddressGoongIo(searchText: string): Observable<any[]> {
    if (searchText === "")
      return new Observable<any[]>((observer) => observer.next([]));

    const searchParams = `?api_key=${GOONGIO_API_KEY}&address=${encodeURI(
      searchText
    )}`;
    return this.httpClient.get(`${GOONGIO_GEOCODING_API}${searchParams}`).pipe(
      map((response: any) => {
        const { results = [] } = response;
        if (Array.isArray(results)) {
          return results.map(this.extractAddressLocationGoongIo);
        }
        return [];
      })
    );
  }
}
