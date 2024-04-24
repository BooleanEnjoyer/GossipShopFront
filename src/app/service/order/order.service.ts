import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/entity/order/order';
import { environment } from 'src/environments/environment';
import {CompleteOrderRequest} from "../../entity/order/request/complete-order-request";
import {BasicResponse} from "../../entity/order/response/basic-response";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  addOrder(order: Order): Observable<Order> {
    let url = environment.apiUrl + `/app/order/new`;
    return this.httpClient.post<Order>(url, order);
  }

  openBlackBox(completeRequest: CompleteOrderRequest): Observable<BasicResponse>{
    let url = environment.apiUrl + `/app/order/take`;
    return this.httpClient.patch<BasicResponse>(url, completeRequest);
  }

  getFreeOrders(searchTerm: string, page: number, limit: number, sortOption: string, sortOrder: string):Observable<Order[]>{
    let url = environment.apiUrl + `/app/order/free/${page}/${limit}?searchTerm=${searchTerm}&sortOption=${sortOption}&sortOrder=${sortOrder}`;
    return this.httpClient.get<Order[]>(url, { headers: new HttpHeaders().set('Include-Token', 'true') })
  } 

  getRecipientOrders(searchTerm: string, page: number, limit: number, sortOption: string, sortOrder: string, userEmail: string):Observable<Order[]> {
    let url =  environment.apiUrl + `/app/order/recipient/${page}/${limit}?searchTerm=${searchTerm}&sortOption=${sortOption}&sortOrder=${sortOrder}&userEmail=${userEmail}`;
    return this.httpClient.get<Order[]>(url, { headers: new HttpHeaders().set('Include-Token', 'true') })
  }

  getSenderOrders(searchTerm: string, page: number, limit: number, sortOption: string, sortOrder: string, userEmail: string):Observable<Order[]> {
    let url =  environment.apiUrl + `/app/order/sender/${page}/${limit}?searchTerm=${searchTerm}&sortOption=${sortOption}&sortOrder=${sortOrder}&userEmail=${userEmail}`;
    return this.httpClient.get<Order[]>(url, { headers: new HttpHeaders().set('Include-Token', 'true') })
  }

  findOrderByTrackingCode(trackingCode : string):Observable<Order>{
    let url = `${environment.apiUrl}/app/order/tracking/${trackingCode}`;
    return this.httpClient.get<Order>(url);
  }

  //TODO użyć kiedyś
  deleteOrder(id : string){
    let url = `${environment.apiUrl}/app/order/${id}`;
    return this.httpClient.delete<Order>(url, { headers: new HttpHeaders().set('Include-Token', 'true') });
  }
}
