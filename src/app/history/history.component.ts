import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderHistoryItem } from '../model/order-history-item';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  orderHistoryItems: OrderHistoryItem[] = [];
  grouppedItems: any[] = [];

  constructor(
    private cookieService: CookieService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadHistoryData();
  }

  private loadHistoryData(): void {
    if(this.cookieService.get('userId')) {
      const userId = Number(this.cookieService.get('userId'));
      this.orderService.getOrderHistoryForUser(userId).subscribe(
        {next: (orderHistoryItems: OrderHistoryItem[]) => {
          this.orderHistoryItems = orderHistoryItems;
          const groupped = this.groupBy(orderHistoryItems, 'orderId');
          this.grouppedItems = Object.values(groupped);
        }}
      )
    }
  }

  groupBy(array: any[], key: string): any {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {}); 
  };

}
