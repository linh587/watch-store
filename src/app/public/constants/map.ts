export const MAPBOX_GEOCODING_API =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/";
export const LOCATIONIQ_GEOCODING_API = "https://us1.locationiq.com/v1/search";
export const LOCATIONIQ_GEOCODING_ACCESS_TOKEN =
  "pk.671d39abcdc5a7341e6c60246e2b22cc";
export const LOCATIONIQ_REVERSE_GEOCODING_API =
  "https://us1.locationiq.com/v1/reverse";
export const GOONGIO_API_KEY = "fbrIodRoukcmDZ57WtIbS4YMxaliIfYk8OMHM4Kq";
export const GOONGIO_GEOCODING_API = "https://rsapi.goong.io/geocode";
export const GOONGIO_DIRECTION_API = "https://rsapi.goong.io/Direction";

export interface MapboxAddressLocation {
  textVi: string;
  longitude: number;
  latitude: number;
}

export interface LocationiqAddressLocation {
  placeId: string;
  longitude: string;
  latitude: string;
  displayName: string;
}

export interface GoongIoAddressLocation {
  longitude: string;
  latitude: string;
  formattedAddress: string;
}

export interface GoongIoCoordinate {
  longitude: string;
  latitude: string;
}
