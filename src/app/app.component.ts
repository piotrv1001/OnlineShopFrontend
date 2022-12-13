import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OrderItem } from './model/order-item';
import { OrderItemService } from './service/order-item/order-item.service';
import { SharedService } from './service/shared-service';
import { AdminInfo, UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;
  isAdmin = false;
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private cookieService: CookieService,
    private orderItemService: OrderItemService) {
      this.sharedService.cartItemChangeEmitted$.subscribe(update => {
        if(update) {
          this.updateCartItemCount();
        }
      })
    }

  ngOnInit(): void {
    this.authenticate();
    this.updateCartItemCount();
  }

  private authenticate(): void {
    this.userService.authenticate().subscribe(
      {next: (adminInfo: AdminInfo) => {
        this.isAuthenticated = true;
        if(adminInfo['admin']) {
          this.cookieService.set('admin', '1');
          this.isAdmin = true;
        }
      }
    });
  }

  private updateCartItemCount(): void {
    if(this.cookieService.get('userId')) {
      this.orderItemService.getOrderItemsByUserId(Number(this.cookieService.get('userId'))).subscribe(
        {next: (orderItems: OrderItem[]) => {
          this.cartItemCount = orderItems.length;
        }}
      )
    }
  }

  onCategorySelected(categoryId: number): void {
    if(this.router.url !== '/products') {
      this.router.navigate(['products'], {state: {categoryId: categoryId}});
    } else {
      this.sharedService.emitChange(categoryId);
    }
  }

  logout(): void {
    this.userService.logout().subscribe(
      {complete: () => {
        this.router.navigate(['login']);
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.cookieService.delete('userId');
        this.cookieService.delete('admin');
      }}
    )
  }

  onEvent(elementRef: any): void {
    if(elementRef !== undefined && elementRef.notifyAboutAuth !== undefined) {
      elementRef.notifyAboutAuth.subscribe((event: boolean) => {
        if(event) {
          this.authenticate();
        }
      });
    }
  }
  
}
