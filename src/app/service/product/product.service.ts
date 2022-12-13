import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = '/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductsByOrderItems(orderItemIds: number[]): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.baseUrl}/order-item`, {'order-item-ids': orderItemIds});
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?categoryId=${categoryId}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  deleteProductById(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`, {observe: 'response'});
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put<Product>(this.baseUrl, product);
  }
}
