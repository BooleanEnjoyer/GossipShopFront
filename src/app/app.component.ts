import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GossipShopFront';

  constructor(private router: Router) {}

  showOnlyRouterContent(): boolean {
    const routesWithoutHeaderFooter = ['/login', '/register'];
    return routesWithoutHeaderFooter.includes(this.router.url);
  }
}
