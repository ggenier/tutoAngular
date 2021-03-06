import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 50;
  showImage: boolean = false;
  private listFilter: string = '';
  errorMessage: string;

  public get filterList(): string {
    return this.listFilter;
  }
  public set filterList(value: string) {
    this.listFilter = value;
    this.filteredProducts = this.filterList ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];

  products: IProduct[] = [];

  constructor(private productService: ProductService) {

  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    // -1 if value not found
  }

  toggleImage(): void {
      this.showImage = !this.showImage;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products,
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list ' + message;
  }
}
