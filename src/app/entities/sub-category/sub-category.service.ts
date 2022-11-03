import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SubCategoryClass } from './sub-category-class';
@Injectable()
export class SubCategoryService {
  private urlEndPoint: string = 'http://localhost:8080/api/subcategories';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor( private http : HttpClient ) {}

  getSubCategories(): Observable<SubCategoryClass[]> {

    return this.http.get<SubCategoryClass[]>(this.urlEndPoint);
    }
      create(subCategory: SubCategoryClass) : Observable<SubCategoryClass> {
        return this.http.post<SubCategoryClass>(this.urlEndPoint, subCategory, {headers: this.httpHeaders})
      }
      getSubCategory(id): Observable<SubCategoryClass>{
        return this.http.get<SubCategoryClass>(`${this.urlEndPoint}/${id}`)
      }
      update(subCategory: SubCategoryClass): Observable<SubCategoryClass>{
        return this.http.put<SubCategoryClass>(`${this.urlEndPoint}/${subCategory.id}`, subCategory, {headers: this.httpHeaders})
      }

      delete( id: number): Observable<SubCategoryClass>{
        return this.http.delete<SubCategoryClass>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      }

  }
