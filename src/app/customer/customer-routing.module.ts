import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { customerAuthGuard } from '../guards/customer-auth.guard';

const routes: Routes = [
  {path: '', children:[
    {path: '', component: ShopComponent,},
    {path: 'product-details/:_id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent, canActivate: [customerAuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
