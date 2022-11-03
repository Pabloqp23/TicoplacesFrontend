import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DistrictClass } from './district-class';
import { CantonClass } from '../canton/canton-class';

@Injectable()
export class DistrictService {
  private urlEndPoint: string = 'http://localhost:8080/api/districts';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor( private http : HttpClient ) {}

    getCantons(): Observable<CantonClass[]> {
        return this.http.get<CantonClass[]>(this.urlEndPoint + '/cantones');
      }
      
  getDistricts(): Observable<DistrictClass[]> {

    return this.http.get<DistrictClass[]>(this.urlEndPoint);
    }
      create(district : DistrictClass) : Observable<DistrictClass> {
        return this.http.post<DistrictClass>(this.urlEndPoint, district, {headers: this.httpHeaders})
      }
      getDistrict(id): Observable<DistrictClass>{
        return this.http.get<DistrictClass>(`${this.urlEndPoint}/${id}`)
      }
      update(district: DistrictClass): Observable<DistrictClass>{
        return this.http.put<DistrictClass>(`${this.urlEndPoint}/${district.id}`, district, {headers: this.httpHeaders})
      }

      delete( id: number): Observable<DistrictClass>{
        return this.http.delete<DistrictClass>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      }

  }
