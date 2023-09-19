import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : Cart = {items :[{
    product : 'https://s3-eu-west-1.amazonaws.com/img4.haraj.com.sa/cache4/800x800-1_-GO__MTU5ODM3NzcwMzA5NDMxMDY0Mjg3.jpg' ,
    name : 'snickers',
    price : 159,
    quantity: 1,
    id: 1
  }]}
  dataSource : Array<CartItem> = []
  displayedColumns:Array<string> =[
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService :CartService,private http : HttpClient){}

  ngOnInit():void{
    
    this.cartService.cart.subscribe((_cart)=>{
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  getTotal(items:Array<CartItem>) : number{
   return this.cartService.getTotal(items)
  }

  onClearCart():void{
    this.cartService.clearCart()
  }
  onRemoveOnCart(element : CartItem):void{
    this.cartService.removeOnCart(element)
  }
  onAddQuantity(item:CartItem):void{
    this.cartService.addToCart(item)
  }
  onRemoveQuantity(item:CartItem):void{
    this.cartService.removeQuantity(item)
  }
  onCheckout():void{
    this.http.post('http://localhost:4242/checkout',{
      items : this.cart.items
    }).subscribe(async (res:any)=>{
      let stripe = await loadStripe('pk_test_51Nc4M3BBMzte0gze0eJMExC4gET6TXF3CPPBrWVjSjKdWSbiJMofaqIqmDSXtIhd47MLKbYLOviFTizkyWDsGDQ300et0Ssmdt') ;
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
