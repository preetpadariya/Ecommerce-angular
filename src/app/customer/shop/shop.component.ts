import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/dataTypes';
import { ShopService } from '../../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  public shopProducts: Product[] | undefined

  constructor(private shopService: ShopService, private router:Router){}

  ngOnInit(): void {
    this.shopService.trendyProducts().subscribe((res)=>{
      if(res && res.length){
        this.shopProducts = res
      }
      
    })
    let user = localStorage.getItem('customer')
    if (user){
      this.shopService.getCartCount()
    }
  } 

  navigateToDetails(userId: string) {
    this.router.navigate(["/product-details/"+userId]);
  }
}
