import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Product } from '../models/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public url = 'http://localhost:5000/'
  constructor(private http: HttpClient) { }

  getHeaders(){
    let userStore = localStorage.getItem('admin')
    let accessToken = userStore && JSON.parse(userStore).accessToken

    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    return httpHeaders
  }

  errorHandler(error: HttpErrorResponse){
    console.log(error);
    return throwError(error)
  }

  getProducts(){
    let Headers = this.getHeaders()
    return this.http.get<Product[]>(`${this.url}products/seller-prod`, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  getProduct(productId: string){
    let Headers = this.getHeaders()
    return this.http.get<Product>(`${this.url}products/${productId}`, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }
}
