import { ProvinceClass } from '../province/province-class';
import { CantonClass } from '../canton/canton-class';
import { DistrictClass } from '../district/district-class';
import { CategoriesClass } from '../categories/categories-class';
export class PlaceClass {
  idPlace: number;
  placeName: string;
  photo: string;
  longitude:string;
  latitude: string;
  category: CategoriesClass;
  provincia: ProvinceClass;
  cantonPlace: CantonClass;
  distrito: DistrictClass;
  history: string;
  description: string;
}
