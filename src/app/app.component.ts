import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from './service/shared-service';
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
    private userService: UserService,
    private sharedService: SharedService,
    private cookieService: CookieService) {}

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
        this.cookieService.delete('userId');
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
