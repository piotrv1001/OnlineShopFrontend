import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(
      {complete: () => {
        this.notifyAboutAuth.emit(true);
        this.router.navigate(['']);
      }}
    )
  }

}
