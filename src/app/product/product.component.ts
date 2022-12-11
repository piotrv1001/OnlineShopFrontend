import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
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
    switch(categoryId) {
      case 1:
        for(let i = 0; i < 12; i++) {
          this.products.push({
            name: `Dog food ${i + 1}`,
            price: 25
          });
        }
        break;
      case 2:
        for(let i = 0; i < 12; i++) {
          this.products.push({
            name: `Cat food ${i + 1}`,
            price: 25
          });
        }
        break;
        case 3:
        for(let i = 0; i < 12; i++) {
          this.products.push({
            name: `Fish food ${i + 1}`,
            price: 25
          });
        }
        break;
        case 4:
        for(let i = 0; i < 12; i++) {
          this.products.push({
            name: `Bird food ${i + 1}`,
            price: 25
          });
        }
        break;
    }
  }

  ngOnInit(): void {
  }

}
