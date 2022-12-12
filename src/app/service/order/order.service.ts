import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderHistoryItem } from 'src/app/model/order-history-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = '/order';

  constructor(private http: HttpClient) { }

  getOrderHistoryForUser(userId: number): Observable<OrderHistoryItem[]> {
    return this.http.get<OrderHistoryItem[]>(`${this.baseUrl}?userId=${userId}`);
  }

  updateOrder(userId: number, address: string, name: string, phoneNumber: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?userId=${userId}&address=${address}&name=${name}&phoneNumber=${phoneNumber}`, null);
  }
}
