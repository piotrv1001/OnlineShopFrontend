import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categoryId: number = 0;
  productId?: number = undefined;
  name: string = '';
  price: number = 0;
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService) {
    const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {
        categoryId: number,
        productId?: number
      };
      if(state.categoryId !== undefined) {
        this.categoryId = state.categoryId;
      }
      if(state.productId !== undefined) {
        this.isEdit = true;
        this.productId = state.productId;
        this.initData(this.productId);
      } 
   }

  ngOnInit(): void {
  }

  private initData(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      {next: (product: Product) => {
        this.name = product.name;
        this.price = product.price;
      }}
    )
  }

  onSubmit(): void {
    if(this.isEdit) {
      const product = {
        productId: this.productId,
        name: this.name,
        price: this.price,
        categoryId: this.categoryId
      }
      this.productService.updateProduct(product).subscribe(
        {complete: () => {
          this.router.navigate(['products'], {state: {categoryId: this.categoryId}});
        }}
      )
    } else {
      const product = {
        name: this.name,
        price: this.price,
        categoryId: this.categoryId
      }
      this.productService.addProduct(product).subscribe(
        {complete: () => {
          this.router.navigate(['products'], {state: {categoryId: this.categoryId}});
        }}
      )
    }    
  }

}
