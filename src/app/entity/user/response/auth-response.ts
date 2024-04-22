export class AuthResponse {
  constructor(public token : string,
              public userEmail : string,
              public id : string,
              public authMessage : number){}
}
