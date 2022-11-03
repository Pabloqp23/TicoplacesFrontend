import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CategoriesClass } from './categories-class';

@Injectable()
export class CategoriesService {
  private urlEndPoint: string = 'http://localhost:8080/api/categories';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor( private http : HttpClient ) {}

  getCategories(): Observable<CategoriesClass[]> {

    return this.http.get<CategoriesClass[]>(this.urlEndPoint);
    }
      create(category: CategoriesClass) : Observable<CategoriesClass> {
        return this.http.post<CategoriesClass>(this.urlEndPoint, category, {headers: this.httpHeaders})
      }
      getCategory(id): Observable<CategoriesClass>{
        return this.http.get<CategoriesClass>(`${this.urlEndPoint}/${id}`)
      }
      update(category: CategoriesClass): Observable<CategoriesClass>{
        return this.http.put<CategoriesClass>(`${this.urlEndPoint}/${category.idCategory}`, category, {headers: this.httpHeaders})
      }

      delete( id: number): Observable<CategoriesClass>{
        return this.http.delete<CategoriesClass>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      }

  }
