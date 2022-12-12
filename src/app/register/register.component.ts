import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() notifyAboutAuth: EventEmitter<boolean> = new EventEmitter();
  email: string = '';
  password: string = '';
  name: string = '';
  address: string = '';
  phoneNumber: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user = {
      email: this.email, 
      password: this.password,
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      isAdmin: 0,
    }
    this.userService.register(user).subscribe(
      {complete: () => {
        this.userService.login(this.email, this.password).subscribe(
          {next: (userId: string) => {
            if(!this.cookieService.get('userId')) {
              this.cookieService.set('userId', userId);
            }
            this.notifyAboutAuth.emit(true);
              this.router.navigate(['']);
          }}
        )
      }}
    )
  }

}
