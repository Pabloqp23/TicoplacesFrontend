import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProvinceClass } from './province-class';

@Injectable()
export class ProvinceService {

private urlEndPoint: string = 'http://localhost:8080/api/provinces';

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http : HttpClient ) {}

getProvinces(): Observable<ProvinceClass[]> {

  return this.http.get<ProvinceClass[]>(this.urlEndPoint);
  }
    create(province: ProvinceClass) : Observable<ProvinceClass> {
      return this.http.post<ProvinceClass>(this.urlEndPoint, province, {headers: this.httpHeaders})
    }
    getProvince(id): Observable<ProvinceClass>{
      return this.http.get<ProvinceClass>(`${this.urlEndPoint}/${id}`)
    }
    update(province: ProvinceClass): Observable<ProvinceClass>{
      return this.http.put<ProvinceClass>(`${this.urlEndPoint}/${province.id}`, province, {headers: this.httpHeaders})
    }

    delete( id: number): Observable<ProvinceClass>{
      return this.http.delete<ProvinceClass>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    }

}
