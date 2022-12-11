import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product/product.service';
import { SharedService } from '../service/shared-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private sharedService: SharedService) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {
        categoryId: number
      };
      if(state.categoryId !== undefined) {
        this.loadData(state.categoryId);
      } 
      this.sharedService.changeEmitted$.subscribe(categoryId => {
        this.loadData(categoryId);
      });
  }

  private loadData(categoryId: number): void {
    this.products = [];
    this.productService.getProductsByCategoryId(categoryId).subscribe(
      {next: (products) => {
        this.products = products;
      }}
    )
  }

  ngOnInit(): void {
  }

}
