import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT:{[id:number]:number} = {1:400, 3:335, 4: 350}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  
  counAll = 6
  cols = 3 
  category:string | undefined
  rowHeight = ROWS_HEIGHT[this.cols]
  products: Array<Product> | undefined
  sort = 'desc'
  counts = 12
  productsSubcription : Subscription | undefined


  constructor(private cartService : CartService, private storeService:StoreService){

  }


  ngOnInit(): void {
    this.getProduct()
  }


  getProduct(): void {
    this.storeService.getAllProduct(this.counts,this.sort,this.category)
    .subscribe((_product)=>{
      this.products = _product
    })
  }

  onColumnsCountChange(colsNum: number):void{
    this.cols = colsNum
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }
  onShowCategory(newCategory:string):void{
    this.category = newCategory
    this.getProduct()
  }

  onAddToCart(product : Product):void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity:1,
      id:product.id
    })
  }

  onItemsCountChange(newCount:number):void{
    this.counts = newCount
    this.getProduct()
  }

  onSortChange(newSort:string):void{
    this.sort = newSort
    this.getProduct()
  }

  ngOnDestroy(): void {
    if(this.productsSubcription){
      this.productsSubcription.unsubscribe();
    }
  }
}
