import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from "../../../service/user/auth/auth.service";
import { Router } from '@angular/router';
import { AudioService } from 'src/app/service/sound/audio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private audioService: AudioService) { }

  ngOnInit(): void {

  }

  playBirdSound(){
    this.audioService.playRandomSound();
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/product/category', category])
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
