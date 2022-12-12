import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { OrderService } from '../service/order/order.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  userId: number = -1;
  address: string = "";
  name: string = "";
  phoneNumber: string = "";

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  onSubmit(): void {
    this.orderService.updateOrder(
      this.userId,
      this.address,
      this.name,
      this.phoneNumber
    ).subscribe(
      {next: () => {
        this.router.navigate(['/']);
      }}
    )
  }

  private loadUserData(): void {
    if(this.cookieService.get('userId')) {
      const userId = Number(this.cookieService.get('userId'));
      this.userId = userId;
      this.userService.getUserById(userId).subscribe(
        {next: (user: User) => {
          this.address = user.address;
          this.name = user.name;
          this.phoneNumber = user.phoneNumber;
        }}
      )
    }
  }

}
