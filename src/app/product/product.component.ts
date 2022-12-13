import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../model/product';
import { OrderItemService } from '../service/order-item/order-item.service';
import { ProductService } from '../service/product/product.service';
import { SharedService } from '../service/shared-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  isAdmin = false;
  categoryId: number = 0;
  showCannotRemoveError: boolean = false;
  searchedProducts: string = '';
  filteredProducts: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private sharedService: SharedService,
    private orderItemService: OrderItemService,
    private cookieService: CookieService) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {
        categoryId: number
      };
      if(state.categoryId !== undefined) {
        this.categoryId = state.categoryId;
        this.loadData(state.categoryId);
      } 
      this.sharedService.changeEmitted$.subscribe(categoryId => {
        this.categoryId = categoryId;
        this.loadData(categoryId);
      });
  }

  private loadData(categoryId: number): void {
    this.showCannotRemoveError = false;
    this.products = [];
    this.productService.getProductsByCategoryId(categoryId).subscribe(
      {next: (products) => {
        this.products = products;
        this.filteredProducts = products;
      }}
    )
  }

  goToAddProduct(): void {
    this.router.navigate(['add-product'], {state: {categoryId: this.categoryId}});
  }

  goToEditProduct(index: number): void {
    this.router.navigate(['add-product'], {state: {categoryId: this.categoryId, productId: this.products[index].productId}});
  }

  filterProducts(): void {
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().startsWith(this.searchedProducts.toLowerCase())
         || product.name.toLowerCase().endsWith(this.searchedProducts.toLowerCase()));
  }

  removeProduct(index: number): void {
    if(confirm('Are you sure you want to delete ' + this.products[index].name)) {
      this.productService.deleteProductById(this.products[index].productId!).subscribe(     
        {next: () => {
          this.products.splice(index, 1);
          this.showCannotRemoveError = false;
        },
        error: () => {
          this.showCannotRemoveError = true;
        }}
      )
    }    
  }

  ngOnInit(): void {
    if(this.cookieService.get('admin')) {
      this.isAdmin = true;
    }
  }

  addToCart(productId: number): void {
    if(this.cookieService.get('userId')) {
      const userId = Number(this.cookieService.get('userId'));
      this.orderItemService.addOrderItemToOrder(userId, productId).subscribe(
        // {complete: () => {
        //   this.sharedService.emitChange({cart: true});
        // }}
      )
    }
  }

}
