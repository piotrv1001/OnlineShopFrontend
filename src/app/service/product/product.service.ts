import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { HttpClientHelper } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = `${HttpClientHelper.baseUrl}/product`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/categoryId=${categoryId}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  deleteProductById(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
