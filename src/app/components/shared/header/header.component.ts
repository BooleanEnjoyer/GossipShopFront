import {Component, OnInit, ElementRef} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {AuthService} from "../../../service/user/auth/auth.service";
import {UserService} from "../../../service/user/user.service";
import {animate, style, state, trigger, transition} from "@angular/animations";
import { ShoppingCartService } from 'src/app/service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(-100%, {{navHeight}}, 0)'
      }), { params: { navHeight: 0 } }),
      state('out', style({
        transform: 'translate3d(0, {{navHeight}}, 0)'
      }), { params: { navHeight: 0 } }),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})

export class HeaderComponent implements OnInit {

  menuState = 'in';
  isProductBasketOpened = false;

  constructor(private router: Router, private authService: AuthService, private userService: UserService,
              private elementRef: ElementRef, private shoppingCartService: ShoppingCartService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  ngOnInit(): void {

  }

  isCartEmpty(){
    return this.shoppingCartService.isCartEmpty();
  }

  isOpened(){
    console.log("IS OPENED " + this.menuState)
    return this.menuState == 'out';
  }

  getNavHeight() {
    const navHeight = document.querySelector('.upperContent')?.clientHeight || 0;
    console.log("NAV HEIGHT " + navHeight)
    return navHeight + 'px';
  }

  togglePanel() {
    console.log("BEFORE " + this.menuState)
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    console.log("AFTER " + this.menuState)
    console.log("AFTER " + document.querySelector('.navPopup')?.clientHeight)
    let content = document.querySelector('.appLayout') as HTMLElement;
    let navContent = document.querySelector('.navPopup') as HTMLElement;
    if(this.isOpened()){
      content.style.overflowY = 'hidden';
      navContent.style.overflowY = 'auto';
    } else {
      content.style.overflowY = 'auto';
    }
  }

  openProductBasket(){
    this.isProductBasketOpened = true;
  }

  closeProductBasket(){
    this.isProductBasketOpened = false;
  }

  submitProductBasket(){
    this.isProductBasketOpened = false;
  }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  goToDashBoard(){
    this.router.navigateByUrl('/dashboard');
  }

  logout(){
    console.log("Logged out")
    this.userService.logout();
    this.authService.clearUserStorage();
    this.router.navigateByUrl('/dashboard');
  }
}
