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

  updateOrder(userId: number, address: string, name: string, phoneNumber: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?userId=${userId}&address=${address}&name=${name}&phoneNumber=${phoneNumber}`, null);
  }
}
