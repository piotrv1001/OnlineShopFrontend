import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { SharedService } from './service/shared-service';
import { CookieService } from 'ngx-cookie-service';
import { HistoryComponent } from './history/history.component';
import { PaymentComponent } from './payment/payment.component';
import { AddProductComponent } from './add-product/add-product.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    ProductComponent,
    HistoryComponent,
    PaymentComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    SharedService, 
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
