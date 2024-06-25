import { Component, OnInit } from '@angular/core';
import { Cart, PriceSummary } from '../../models/dataTypes';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  public cart: Cart[] | undefined
  dataSource: MatTableDataSource<any> | undefined;
  displayedColumns: string[] = ['image', 'title', 'quantity', 'price', 'actions'];

  public priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private router: Router, private shopService: ShopService){}

  ngOnInit(): void {
    // this.loadCardDetails()
    this.shopService.getCart().subscribe((res)=>{
      console.log(res);

      this.dataSource = new MatTableDataSource(res.cart.products);
      this.cart = res.cart.products
      let price = 0
      res.cart.products.forEach((item: any)=>{
        if(item.quantity && item.price){
          price+= +item.price * +item.quantity
        }
      })
      this.priceSummary.total = price
      if(!this.cart?.length){
        // this.router.navigate(['/'])
      }else{
        this.shopService.getCartCount()
      }
    })
  }

  loadCardDetails(){
    this.shopService.getCart().subscribe((res)=>{
      this.cart = res.cart.products
      let price = 0
      res.cart.products.forEach((item: any)=>{
        if(item.quantity && item.price){
          price+= +item.price * +item.quantity
        }
      })
      this.priceSummary.total = price
      if(!this.cart?.length){
        // this.router.navigate(['/'])
      }else{
        this.shopService.getCartCount()
      }
    })
  }

  removeFromCart(productId: string){
    this.shopService.removeItemFromCart(productId).subscribe((res)=>{
      this.loadCardDetails()
    })
  }

  checkoutOrder(){
    // this.router.navigate(['/checkout'])
  }

}
