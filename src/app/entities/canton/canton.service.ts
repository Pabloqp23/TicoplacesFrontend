import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CantonClass } from './canton-class';
import { ProvinceClass } from '../province/province-class';

@Injectable()
export class CantonService {

  private urlEndPoint: string = 'http://localhost:8080/api/cantones';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor( private http : HttpClient ) {}

    getProvinces(): Observable<ProvinceClass[]> {
        return this.http.get<ProvinceClass[]>(this.urlEndPoint + '/provincias');
      }

  getCantons(): Observable<CantonClass[]> {

    return this.http.get<CantonClass[]>(this.urlEndPoint);
    }
      create(canton : CantonClass) : Observable<CantonClass> {
        return this.http.post<CantonClass>(this.urlEndPoint, canton, {headers: this.httpHeaders})
      }
      getCanton(id): Observable<CantonClass>{
        return this.http.get<CantonClass>(`${this.urlEndPoint}/${id}`)
      }
      update(canton: CantonClass): Observable<CantonClass>{
        return this.http.put<CantonClass>(`${this.urlEndPoint}/${canton.id}`, canton, {headers: this.httpHeaders})
      }

      delete( id: number): Observable<CantonClass>{
        return this.http.delete<CantonClass>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      }

  }
