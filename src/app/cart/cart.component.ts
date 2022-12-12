import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderItem } from '../model/order-item';
import { Product } from '../model/product';
import { OrderItemService } from '../service/order-item/order-item.service';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];
  products: Product[] = [];

  constructor(
    private cookieService: CookieService,
    private orderItemService: OrderItemService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.loadOrderItems();
  }

  private loadOrderItems(): void {
    if(this.cookieService.get('userId')) {
      const userId = Number(this.cookieService.get('userId'));
      this.orderItemService.getOrderItemsByUserId(userId).subscribe(
        {next: (orderItems: OrderItem[]) => {
          this.orderItems = orderItems;
          if(orderItems.length > 0) {
            const orderItemIds = orderItems.map(item => item.orderItemId!); 
            this.productService.getProductsByOrderItems(orderItemIds).subscribe(
              {next: (products: Product[]) => {
                this.products = products;
              }}
            )
          }
        }}
      )
    }
  }

  updateOrderItemAmount(increment: number, index: number): void {
    if(increment === 1) {
      this.orderItems[index].amount++;
    } else {
      this.orderItems[index].amount--
    }
    this.orderItemService.updateOrderItemAmount(this.orderItems[index].orderItemId!, this.orderItems[index].amount).subscribe()
  }

  removeOrderItem(orderItemId: number, index: number): void {
    this.orderItemService.deleteOrderItemById(orderItemId).subscribe(
      {next: () => {
        this.products.splice(index, 1);
        this.loadOrderItems();
      }}
    )
  }

}
