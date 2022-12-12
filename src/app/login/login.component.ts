import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() notifyAboutAuth: EventEmitter<boolean> = new EventEmitter();
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(
      {next: (userId: string) => {
        if(!this.cookieService.get('userId')) {
          this.cookieService.set('userId', userId);
        }
        this.notifyAboutAuth.emit(true);
          this.router.navigate(['']);
      }}
    )
  }

}
