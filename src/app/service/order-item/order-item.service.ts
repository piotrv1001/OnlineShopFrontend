import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from 'src/app/model/order-item';
import { HttpClientHelper } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private baseUrl: string = `${HttpClientHelper.baseUrl}/order-item`;

  constructor(private http: HttpClient) { }

  getOrderItemsByOrderId(orderId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/orderId=${orderId}`);
  }

  addOrderItemToOrder(orderId: number, productId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orderId=${orderId}&productId=${productId}`, null);
  }

  deleteOrderItemById(orderItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${orderItemId}`);
  }

  updateOrderItemAmount(orderItemId: number, amount: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/orderItemId=${orderItemId}&amount=${amount}`, null);
  }
}
