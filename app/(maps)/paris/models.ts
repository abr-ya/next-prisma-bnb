import { LatLngExpression } from "leaflet";

export interface IPlace {
  picture: string;
  title: string;
  description: string;
  seeMoreLink: string;
  position: LatLngExpression;
}
