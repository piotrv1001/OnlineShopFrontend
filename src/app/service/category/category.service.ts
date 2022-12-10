import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { HttpClientHelper } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = `${HttpClientHelper.baseUrl}/category`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  deleteCategoryById(categoryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${categoryId}`);
  }
}
