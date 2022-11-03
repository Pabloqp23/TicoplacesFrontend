import { Injectable } from '@angular/core';
import { of,Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpRequest,HttpEvent } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { PlaceClass } from './place-class';
import { CantonClass } from '../canton/canton-class';
import { ProvinceClass } from '../province/province-class';
import { DistrictClass } from '../district/district-class';
import { CategoriesClass } from '../categories/categories-class';
import { Router } from '@angular/router';
@Injectable()
export class PlacesService {
  private urlEndPoint: string = 'http://localhost:8080/api/places';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor( private http : HttpClient, private router: Router ) {}

    getCantons(): Observable<CantonClass[]> {
        return this.http.get<CantonClass[]>(this.urlEndPoint + '/cantones');
      }
      getProvinces(): Observable<ProvinceClass[]> {
          return this.http.get<ProvinceClass[]>(this.urlEndPoint + '/provincias');
        }

        getDistricts(): Observable<DistrictClass[]> {
            return this.http.get<DistrictClass[]>(this.urlEndPoint + '/distritos');
          }
          getCategories(): Observable<CategoriesClass[]> {
              return this.http.get<CategoriesClass[]>(this.urlEndPoint + '/categorias');
            }

  getPlaces(): Observable<PlaceClass[]> {

    return this.http.get<PlaceClass[]>(this.urlEndPoint);
    }
      create(place : PlaceClass) : Observable<PlaceClass> {
        return this.http.post<PlaceClass>(this.urlEndPoint, place, {headers: this.httpHeaders})
      }
      getPlace(id): Observable<PlaceClass>{
        return this.http.get<PlaceClass>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
      if (e.status != 401 && e.error.mensaje) {
        this.router.navigate(['/places']);
        console.error(e.error.mensaje);
      }

      return throwError(e);
    }));
      }
      update(place: PlaceClass): Observable<PlaceClass>{
        return this.http.put<PlaceClass>(`${this.urlEndPoint}/${place.idPlace}`, place, {headers: this.httpHeaders})
      }

      delete( id: number): Observable<PlaceClass>{
        return this.http.delete<PlaceClass>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      }
      subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
        let formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("id", id);

        const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
          reportProgress: true
        });

        return this.http.request(req);
      }
    }
