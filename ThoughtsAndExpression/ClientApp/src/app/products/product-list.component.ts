
import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';
import { ProductService } from './product.service';

@Component({
templateUrl: './product-list.component.html',
styleUrls : ['./product-list.component.css']

})

export class ProductListComponent implements OnInit{
pageTitle = 'Product List';
imageWidth: number = 50;
imageMargin: number = 2;
showImage: boolean = false;
_listFilter: string;
errorMessage: string;
get listFilter(): string{
  return this._listFilter;
}
set listFilter(value: string)
{
  this._listFilter = value;
  this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
}

constructor(private productService: ProductService){}
filteredProducts: IProduct[];
 products: IProduct[] ;

  performFilter(filterBy: string): IProduct[]{
    return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void{
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products; },
      error: err =>  this.errorMessage
    });
      }
  onRatingClicked(value: string): void {
    this.pageTitle = 'Product List' + value;
  }
  }

