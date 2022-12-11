import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService) {}

  ngOnInit(): void {
    this.authenticate();
  }

  private authenticate(): void {
    this.userService.authenticate().subscribe(
      {complete: () => {
        this.isAuthenticated = true;
      }
    });
  }

  logout(): void {
    this.userService.logout().subscribe(
      {complete: () => {
        this.router.navigate(['login']);
        this.isAuthenticated = false;
      }}
    )
  }

  onEvent(elementRef: any): void {
    elementRef.notifyAboutAuth.subscribe((event: boolean) => {
      if(event) {
        this.authenticate();
      }
    })
  }
  
}
