import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = '/order';

  constructor(private http: HttpClient) { }

  addOrder(order: Order): Observable<any> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  updateOrderStatus(orderId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${orderId}`, null);
  }
}
