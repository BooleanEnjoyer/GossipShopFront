import {Component, OnInit} from '@angular/core';
import {Order} from '../../../entity/order/order';
import {OrderService} from '../../../service/order/order.service';
import {OrderStatus} from "../../../entity/order/enums/order-status";
import {CompleteOrderRequest} from "../../../entity/order/request/complete-order-request";
import {AuthService} from "../../../service/user/auth/auth.service";
import {LogService} from "../../../service/log/log.service";

@Component({
  selector: 'app-order',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService: OrderService, private authService: AuthService,
              private logService: LogService) {}

  orders: Order[] = [];
  displayedOrders: Order[] = [];
  selectedOrder !: Order;

  itemsPerPage = 10;
  currentPage = 0;
  totalPages = 0;
  searchTerm = '';
  selectedSortOption = 'none';
  selectedSortOrder = 'asc';
  findOption = 'sendOrders';
  isDetailsFormOpen = false;

  openBlackBoxRequest: CompleteOrderRequest = {
    id : '',
    openCode : ''
  }

  ngOnInit() {
    this.getSenderOrders();
  }

  isCompleted(order : Order){
    return order.status === OrderStatus.COMPLETED;
  }

  isSender(){
    return this.findOption === 'sendOrders';
  }

  canBeOpen(order : Order){
    return !this.isCompleted(order) && !this.isSender();
  }

  openDetailsForm(order: Order): void {
    this.selectedOrder = order;
    this.isDetailsFormOpen = true;
  }

  closeDetailsForm() {
    this.isDetailsFormOpen = false;
  }

  openBlackBox(order: Order): void {
    this.openBlackBoxRequest.id = order.id;
    this.openBlackBoxRequest.openCode = order.openCode;
    if(this.logService.isDebugEnabled()){
      console.log(this.openBlackBoxRequest)
    }
    const confirmed = confirm('Napewno chcesz otworzyć BlackBoxa?');
    if(confirmed){
      this.orderService.openBlackBox(this.openBlackBoxRequest)
        .subscribe((response: any) => {
          alert(response)
          this.getRecipientOrders();
        });
    }
  }

  //TODO czemu to jest robione po emailu? nie lepiej zamienić to na id?
  getSenderOrders() {
    const userEmail = this.authService.getUserEmail();
    if(this.logService.isDebugEnabled()){
      console.log("USER EMAIL " + userEmail);
    }
    if (userEmail !== null && userEmail !== undefined) {
      this.orderService.getSenderOrders(this.searchTerm,this.currentPage, this.itemsPerPage,
        this.selectedSortOption, this.selectedSortOrder, userEmail)
        .subscribe((response: any) => {
          this.processResponseData(response);
        });
    } else {
      alert("Error trying to get email relod to fix: " + userEmail);
    }
  }

  getRecipientOrders() {
    const userEmail = this.authService.getUserEmail();
    if(userEmail !== null && userEmail !== undefined){
      this.orderService.getRecipientOrders(this.searchTerm,this.currentPage, this.itemsPerPage,
        this.selectedSortOption, this.selectedSortOrder, userEmail)
        .subscribe((response: any) => {
          this.processResponseData(response);
        });
    } else {
      alert("Error trying to get email relod to fix: " + userEmail);
    }
  }

  //TODO zrobić kiedyś tak aby usuwało zamówienia tylko z widoku usera a nie z bazy
  // deleteOrder(orderId : string) {
  //   const confirmed = confirm('Napewno chcesz usunąć zamówienie?');
  //   if (confirmed) {
  //     this.orderService.deleteOrder(orderId)
  //       .subscribe(() => {
  //           this.getSenderOrders();
  //         },
  //         error => {
  //           console.error('Błąd przy usuwaniu zamówienia:', error);
  //         }
  //       );
  //   }
  // }

  search() {
    if(this.logService.isDebugEnabled()){
      console.log(this.findOption)
    }
    if(this.findOption === "receivedOrders"){
      this.getRecipientOrders();
    }else {
      this.getSenderOrders();
    }
  }

  private processResponseData(response: any) {
    this.orders = response.content.map(
      (orderData: any) => new Order(
        orderData.id,
        orderData.trackingCode,
        orderData.openCode,
        orderData.totalPrice,
        orderData.status,
        orderData.startingAddress,
        orderData.targetAddress,
        orderData.dateCreated,
        orderData.lastUpdated,
        orderData.sender,
        orderData.recipient)
    );
    this.totalPages = response.totalPages;
    this.displayedOrders = this.orders;
  }

  changePage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.search();
  }
}
