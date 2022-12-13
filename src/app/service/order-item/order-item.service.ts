import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from 'src/app/model/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private baseUrl: string = '/order-item';

  constructor(private http: HttpClient) { }

  getOrderItemsByUserId(userId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}?userId=${userId}`);
  }

  getOrderItemCountByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?userId=${userId}&count=true`, {responseType: 'text'});
  }

  addOrderItemToOrder(userId: number, productId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?userId=${userId}&productId=${productId}`, null);
  }

  deleteOrderItemById(orderItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${orderItemId}`);
  }

  updateOrderItemAmount(orderItemId: number, amount: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?orderItemId=${orderItemId}&amount=${amount}`, null);
  }
}
