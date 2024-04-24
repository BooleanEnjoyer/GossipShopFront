import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from 'src/app/entity/product/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    let url = environment.apiUrl + `/app/product`;
    return this.httpClient.post<Product>(url, product);
  }

  getProducts(searchTerm: string, page: number, limit: number, sortOption: string, sortOrder: string, category: string):Observable<Product[]> {
    let url =  environment.apiUrl + `/app/product/${page}/${limit}?searchTerm=${searchTerm}&sortOption=${sortOption}&sortOrder=${sortOrder}&productType=${category}`;
    return this.httpClient.get<Product[]>(url, { headers: new HttpHeaders().set('Include-Token', 'true') })
  }
}
