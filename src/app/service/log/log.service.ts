import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  debugEnabled = true;

  constructor() { }

  isDebugEnabled(){
    return this.debugEnabled;
  }
}
